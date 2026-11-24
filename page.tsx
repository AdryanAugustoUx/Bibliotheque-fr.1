'use client';

import { useState } from 'react';
import { Book } from '../types/book';
import BookCard from '../components/BookCard';

const MOCK_BOOKS: Book[] = [
  {
    id: '1',
    title: 'Le Petit Prince',
    author: 'Antoine de Saint-Exupéry',
    cover_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
    cefr_level: 'A2',
    category: 'Literatura',
    synopsis: 'Um clássico da literatura francesa sobre amizade, amor e perda através dos olhos de um jovem príncipe.',
    status: 'available',
  },
  {
    id: '2',
    title: 'L’Étranger',
    author: 'Albert Camus',
    cover_url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400',
    cefr_level: 'B2',
    category: 'Filosofia / Romance',
    synopsis: 'A história de Meursault, um homem indiferente que comete um crime na Argélia francesa.',
    status: 'borrowed',
  },
  {
    id: '3',
    title: 'Grammaire Progressive du Français',
    author: 'Maia Grégoire',
    cover_url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400',
    cefr_level: 'A1',
    category: 'Gramática',
    synopsis: 'O livro essencial para iniciantes dominarem as estruturas fundamentais da língua francesa.',
    status: 'available',
  },
  {
    id: '4',
    title: 'Astérix le Gaulois',
    author: 'René Goscinny & Albert Uderzo',
    cover_url: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400',
    cefr_level: 'B1',
    category: 'Bande Dessinée',
    synopsis: 'As aventuras irônicas e divertidas dos gauleses contra o Império Romano.',
    status: 'available',
  }
];

export default function Home() {
  const [search, setSearch] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('TODOS');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const filteredBooks = MOCK_BOOKS.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase()) || 
                          book.author.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = selectedLevel === 'TODOS' || book.cefr_level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  const levels = ['TODOS', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  return (
    <main className="min-h-screen bg-slate-50 pb-16">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <h1 className="text-xl font-bold text-indigo-900 tracking-tight">Bibliothèque de Français</h1>
          </div>
          <div className="w-full sm:w-80">
            <input 
              type="text" 
              placeholder="Buscar por título ou autor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 text-sm bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-transparent"
            />
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 mt-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                selectedLevel === level 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {level === 'TODOS' ? 'Todos os Níveis' : `Nível ${level}`}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          {selectedLevel === 'TODOS' ? 'Acervo Disponível' : `Obras - Nível ${selectedLevel}`}
        </h2>
        {filteredBooks.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-sm">Nenhum livro encontrado com esses filtros.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} onSelect={setSelectedBook} />
            ))}
          </div>
        )}
      </div>

      {selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setSelectedBook(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xl font-bold"
            >
              ✕
            </button>
            <div className="flex gap-4 mb-4">
              <img 
                src={selectedBook.cover_url} 
                alt={selectedBook.title} 
                className="w-24 h-32 object-cover rounded-lg shadow"
              />
              <div>
                <span className="inline-block px-2 py-0.5 text-xs font-bold bg-indigo-100 text-indigo-700 rounded mb-1">
                  {selectedBook.cefr_level} • {selectedBook.category}
                </span>
                <h3 className="font-bold text-slate-800 text-lg leading-tight">{selectedBook.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{selectedBook.author}</p>
              </div>
            </div>
            <div className="border-t border-slate-100 pt-4">
              <h4 className="text-xs font-semibold uppercase text-slate-400 mb-1">Sinopse</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{selectedBook.synopsis}</p>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${selectedBook.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {selectedBook.status === 'available' ? 'Disponível na Estante' : 'Emprestado'}
              </span>
              <button
                onClick={() => setSelectedBook(null)}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-medium rounded-lg hover:bg-slate-800 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}