import { makeAutoObservable } from 'mobx';
import { z } from 'zod';
import { type CustomCollection, collectionSchema } from '../../core/types/Collections.types';
import { type MediaItem } from '../../../Common';

const STORAGE_KEY = 'cineview_custom_collections';

class CollectionsStore {
  collections: CustomCollection[] = [];

  constructor() {
    makeAutoObservable(this);
    this.hydrate();
  }

  getCollectionById = (id: string): CustomCollection | undefined => {
    return this.collections.find(c => c.id === id);
  };

  isItemInCollection = (collectionId: string, mediaId: number): boolean => {
    const collection = this.getCollectionById(collectionId);
    if (!collection) return false;
    return collection.items.some(item => item.id === mediaId);
  };

  createCollection = (name: string, description?: string) => {
    const newCollection: CustomCollection = {
      id: crypto.randomUUID(),
      name,
      description,
      createdAt: new Date().toISOString(),
      items: [],
    };

    this.collections.unshift(newCollection);
    this.saveToStorage();
  };

  deleteCollection = (id: string) => {
    this.collections = this.collections.filter(c => c.id !== id);
    this.saveToStorage();
  };

  addItemToCollection = (collectionId: string, item: MediaItem) => {
    if (this.isItemInCollection(collectionId, item.id)) return;

    this.collections = this.collections.map(c =>
      c.id === collectionId ? { ...c, items: [...c.items, item] } : c
    );
    this.saveToStorage();
  };

  removeItemFromCollection = (collectionId: string, mediaId: number) => {
    this.collections = this.collections.map(c =>
      c.id === collectionId
        ? { ...c, items: c.items.filter(item => item.id !== mediaId) }
        : c
    );
    this.saveToStorage();
  };

  private hydrate = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.collections = z.array(collectionSchema).parse(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to parse custom collections from localStorage', error);
      this.collections = [];
    }
  };

  private saveToStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.collections));
  };
}

export const collectionsStore = new CollectionsStore();