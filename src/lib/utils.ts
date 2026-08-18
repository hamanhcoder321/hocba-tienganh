import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDescription(description: string): string[] {
  if (!description) return [];
  const cleanText = description
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/<p[^>]*>/g, '')
    .replace(/<\/p>/g, '\n')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<ul[^>]*>/g, '')
    .replace(/<\/ul>/g, '')
    .replace(/<li[^>]*>/g, '')
    .replace(/<\/li>/g, '\n');
  
  const initialLines = cleanText
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);

  const finalLines: string[] = [];
  for (const line of initialLines) {
    if (line.includes('•')) {
      const parts = line.split('•').map(p => p.trim()).filter(p => p.length > 0);
      for (const part of parts) {
        finalLines.push(part.replace(/^[-•*]\s*/, ''));
      }
    } else {
      finalLines.push(line.replace(/^[-•*]\s*/, ''));
    }
  }

  return finalLines.filter(line => line.length > 0);
}

export function formatTargets(targets: string): string[] {
  if (!targets) return [];
  const cleanText = targets
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/<p[^>]*>/g, '')
    .replace(/<\/p>/g, '\n')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<ul[^>]*>/g, '')
    .replace(/<\/ul>/g, '')
    .replace(/<li[^>]*>/g, '')
    .replace(/<\/li>/g, '\n');
  return cleanText
    .split('\n')
    .map(line => line.trim())
    .map(line => line.replace(/^[-•*]\s*/, ''))
    .filter(line => line.length > 0);
}
