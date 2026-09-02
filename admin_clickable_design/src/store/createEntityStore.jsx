import { createContext, useContext, useMemo, useState } from 'react'

// Wraps a mock data array in a tiny in-memory CRUD store so add/edit/delete
// flows persist across route navigation within a session. The provider's
// internals (currently useState) are the only piece that needs to change
// when this is later backed by a real API.
export function createEntityStore(initialData, keyField = 'id') {
  const Context = createContext(null)

  function Provider({ children }) {
    const [items, setItems] = useState(initialData)

    const value = useMemo(
      () => ({
        items,
        getById: (id) => items.find((it) => it[keyField] === id),
        add: (item) => setItems((prev) => [item, ...prev]),
        update: (id, patch) =>
          setItems((prev) =>
            prev.map((it) => (it[keyField] === id ? { ...it, ...patch } : it)),
          ),
        remove: (id) => setItems((prev) => prev.filter((it) => it[keyField] !== id)),
      }),
      [items],
    )

    return <Context.Provider value={value}>{children}</Context.Provider>
  }

  function useEntityStore() {
    const ctx = useContext(Context)
    if (!ctx) throw new Error('useEntityStore must be used within its matching Provider')
    return ctx
  }

  return { Provider, useEntityStore }
}
