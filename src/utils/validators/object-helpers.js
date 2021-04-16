export const updateObjectInArray= (item, itemId, propName, statePart ) => {
    return item.map(u => {
        if (u[propName] === itemId) {
            return { ...u, ...statePart}
        }
        return u;
    })
}

