'use client';
import { Book } from '../types/book';

interface BookCardProps {
  book: Book;
  onSelect: (book: Book) => void;
}

const levelColors: Record<string, string> = {
  A1: 'bg-emerald-500 text-white',
  A2: 'bg-teal-500 text-white',
  B1: 'bg-amber-500 text-white',
  B2: 'bg-orange-500 text-white',
  C1: 'bg-rose-500 text-white',
  C2: 'bg-purple-600 text-white',
};

export default function BookCard({ book, onSelect }: BookCardProps) {
  return (
    <div 
      onClick={() => onSelect(book)}
      className="group cursor-pointer flex flex-col gap-2 transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-slate-100 shadow-md">
        <img 
          src={book.cover_url || 'https://via.placeholder.com/300x400?text=Sem+Capa'} 
          alt={book.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className={`absolute top-2 right-2 px-2 py-0.5 text-xs font-bold rounded-md shadow ${levelColors[book.cefr_level] || 'bg-slate-700 text-white'}`}>
          {book.cefr_level}
        </span>
        <div className={`absolute bottom-2 left-2 px-2 py-0.5 text-[10px] font-semibold rounded ${book.status === 'available' ? 'bg-green-600/90 text-white' : 'bg-red-600/90 text-white'}`}>
          {book.status === 'available' ? 'Disponível' : 'Emprestado'}
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-slate-800 text-sm line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {book.title}
        </h3>
        <p className="text-xs text-slate-500 line-clamp-1">{book.author}</p>
      </div>
    </div>
  );
}