import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');

  if (!q) {
    return NextResponse.json({ error: 'Parâmetro de busca "q" é obrigatório.' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&maxResults=5`);
    const data = await response.json();

    const books = (data.items || []).map((item: any) => {
      const info = item.volumeInfo;
      return {
        id: item.id,
        title: info.title || 'Título desconhecido',
        author: info.authors ? info.authors.join(', ') : 'Autor desconhecido',
        cover_url: info.imageLinks?.thumbnail?.replace('http:', 'https:') || '',
        synopsis: info.description || 'Sem sinopse disponível.',
        category: info.categories ? info.categories[0] : 'Geral',
      };
    });

    return NextResponse.json({ books });
  } catch (error) {
    console.error('Erro ao buscar na API do Google Books:', error);
    return NextResponse.json({ error: 'Erro interno ao consultar Google Books.' }, { status: 500 });
  }
}