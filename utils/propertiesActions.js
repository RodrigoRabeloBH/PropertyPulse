const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export async function getSearchProperties(searchTerm, propertyType) {
    try {
        if (!apiDomain)
            return [];
        const res = await fetch(`${apiDomain}/properties/search?searchTerm=${searchTerm}&propertyType=${propertyType}`);
        return await res.json();
    } catch (error) {
        throw new Error(error);
    }
}

export async function getProperties(page = 1, pageSize = 12) {
    try {
        if (!apiDomain) return [];
        const res = await fetch(`${apiDomain}/properties?page=${page}&pageSize=${pageSize}`,
            { cache: 'no-store' });
        return await res.json();
    } catch (error) {
        return [];
    }
}

export async function getPropertiesByUserId(userId) {
    try {
        if (!apiDomain)
            return [];
        const res = await fetch(`${apiDomain}/properties/user/${userId}`);
        if (!res.ok)
            throw new Error('Failed to fetch data');
        return await res.json();
    } catch (error) {
        return [];
    }
}

export async function getPropertyById(id) {
    try {
        if (!apiDomain)
            return null;
        const res = await fetch(`${apiDomain}/properties/${id}`);
        if (!res.ok)
            throw new Error('Failed to fetch data');
        return await res.json();
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
}

export async function getBookmarkedProperties() {
    try {
        if (!apiDomain)
            return null;
        const res = await fetch(`${apiDomain}/bookmarks`);
        return res;
    } catch (error) {
        throw new Error(error);
    }
}

export async function createProperty(formData) {
    try {
        if (!apiDomain)
            return null;

        const res = await fetch(`${apiDomain}/properties`, {
            body: formData,
            method: 'POST'
        });

        if (!res.ok)
            throw new Error('Failed to create property');
        return await res.json();
    } catch (error) {
        throw new Error(error);
    }
}

export async function updateProperty(propertyId, formData) {
    try {
        if (!apiDomain)
            return null;

        const res = await fetch(`${apiDomain}/properties/${propertyId}`, {
            body: formData,
            method: 'PUT'
        });

        if (!res.ok)
            throw new Error('Failed to update property', error);
        return res;
    } catch (error) {
        throw new Error('Failed to update property', error);
    }
}

export async function deleteProperty(propertyId) {
    try {
        if (!apiDomain)
            return null;

        const res = await fetch(`${apiDomain}/properties/${propertyId}`, { method: 'DELETE' });

        if (!res.ok)
            throw new Error('Failed to delete property', error);
        return res;
    } catch (error) {
        throw new Error('Failed to delete property', error);
    }
}

export async function bookmarkProperty(propertyId) {

    try {
        if (!apiDomain)
            return null;

        const res = await fetch(`${apiDomain}/bookmarks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ propertyId })
        });

        return res;

    } catch (error) {
        throw new Error(error);
    }
}

export async function chekBookmarkProperty(propertyId) {
    try {
        if (!apiDomain)
            return null;

        const res = await fetch(`${apiDomain}/bookmarks/check`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ propertyId })
        });

        return await res.json();

    } catch (error) {
        throw new Error(error);
    }
}

export async function getMessages() {
    try {
        if (!apiDomain)
            return null;
        const res = await fetch(`${apiDomain}/messages`);
        return res;
    } catch (error) {
        throw new Error(error);
    }
}

export async function sendMessage(message) {
    try {
        if (!apiDomain)
            return null;

        const res = await fetch(`${apiDomain}/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(message)
        },)
        return res;
    } catch (error) {
        throw new Error(error);
    }
}

export async function deleteMessage(messageId) {
    try {
        if (!apiDomain)
            return null;

        const res = await fetch(`${apiDomain}/messages/${messageId}`, {
            method: 'DELETE'
        });

        return res;

    } catch (error) {
        throw new Error(error);
    }
}

export async function markAsRead(messageId) {
    try {
        if (!apiDomain)
            return null;

        const res = await fetch(`${apiDomain}/messages/${messageId}`, {
            method: 'PUT',
            body: {}
        });

        return res;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getUnreadMessagesCount() {
    try {
        if (!apiDomain)
            return null;
        const res = await fetch(`${apiDomain}/messages/unread-count`);
        return res;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getFeatureProperties() {
    try {
        if (!apiDomain)
            return null;
        const res = await fetch(`${apiDomain}/properties/featured`);
        return await res.json();
    } catch (error) {
        throw new Error(error);
    }
}