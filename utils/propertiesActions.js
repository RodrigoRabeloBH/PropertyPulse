const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export async function getProperties() {
    try {
        if (!apiDomain)
            return [];
        const res = await fetch(`${apiDomain}/properties`);
        if (!res.ok)
            throw new Error('Failed to fetch data');
        return res.json();

    } catch (error) {
        console.error(error);
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
        return res.json();

    } catch (error) {
        console.error(error);
        return null;
    }
}


