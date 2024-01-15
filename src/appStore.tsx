import create from 'zustand.js';
import { persist } from 'zustand/middleware.js';
let appStore=(set)=>({
    dopen:true,
    updateOpen:(dopen)=>set((state)=>({dopen:dopen}))
});
appStore=persist(appStore,{name:"my_app_store"})
export const useAppStore = create(appStore)