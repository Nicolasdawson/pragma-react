const URI = process.env.REACT_APP_BASE_URL + 'usuarios'

export async function GetUsuarios() {
    const response = await fetch(URI)

    if (response.ok) {
        return response.json()
    }
    else {
        console.error(response)
        return []
    }
}

export async function GetUsuario(id) {
    const response = await fetch(URI + "/" + id)
    return response;
}

export async function PostUsuario(usuario) {
    const response = await fetch(URI, {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    return response;
}

export async function PutUsuario(id, usuario) {
    const response = await fetch(URI + "/" + id, {
        method: 'PUT',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    return response;
}

export async function DeleteUsuario(id) {
    const response = await fetch(URI + "/" + id,
        {
            method: 'DELETE'
        });
    return response;
}