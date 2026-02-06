export const fetchInvitations = async () => {
    const res = await fetch('/api/invitations');
    if (!res.ok) throw new Error('Failed to fetch invitations');
    return res.json();
};

export const fetchInvitation = async (id) => {
    const res = await fetch(`/api/invitations/${id}`);
    if (!res.ok) throw new Error('Failed to fetch invitation');
    return res.json();
};

export const createInvitation = async (data) => {
    const res = await fetch('/api/invitations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create invitation');
    return res.json();
};

export const updateInvitation = async (id, data) => {
    const res = await fetch(`/api/invitations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update invitation');
    return res.json();
};

export const deleteInvitation = async (id) => {
    const res = await fetch(`/api/invitations/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete invitation');
    return res.json();
};

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
    });

    if (!res.ok) throw new Error('Failed to upload image');
    return res.json();
};
