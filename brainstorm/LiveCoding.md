# Live Coding Steps

1. Add DDS properties

    ```typescript
    private notesMap: SharedMap;
    private votesMap: SharedMap;
    private usersMap: SharedMap;
    ```

1. Create helper method code in `createSharedMap` to initialize properties

    ```typescript
    const map = SharedMap.create(this.runtime);
    this.root.set(id, map.handle);
    ```

1. Call `createdSharedMap` to create the 3 DDSes

    ```typescript
    this.createSharedMap("notes");
    this.createSharedMap("votes");
    this.createSharedMap("users");
    ```

1. Binding remote changes to the view layer

    ```typescript
    this.createEventListeners(this.notesMap);
    this.createEventListeners(this.votesMap);
    this.createEventListeners(this.usersMap);
    ```

1. Add note to distributed state

    ```typescript
    this.notesMap.set(note.id, note);
    ```

