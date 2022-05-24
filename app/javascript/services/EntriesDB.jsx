export const getEntries = () => {
    return fetch('/api/v1/stafflog/index')
    .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .catch(error => console.log(error.message));
  }

export const addEntry = async (entry) => {
    const token = document.querySelector('meta[name="csrf-token"]').content;
    await fetch('/api/v1/stafflog/create', {
        method: 'POST',
        headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
        },
        body: JSON.stringify(entry)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Network response was not ok.");
    })
    .catch(error => console.log(error.message));
}

export const updateEntry = async (entry, id) => {
    const token = document.querySelector('meta[name="csrf-token"]').content;
    console.log("Entry: " + JSON.stringify(entry));
    await fetch(`/api/v1/stafflog/${id}`, {
        method: 'PATCH',
        headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
        },
        body: JSON.stringify(entry)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Network response was not ok.");
    })
    .catch(error => console.log(error.message));
}

export const deleteEntry = async (index) => {
    const token = document.querySelector('meta[name="csrf-token"]').content;

    await fetch(`/api/v1/stafflog/destroy/${index}`, {
        method: 'DELETE',
        headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
        }
    })
    .then(response => {
    if (response.ok) {
        return response.json();
    }
    throw new Error("Network response was not ok.");
    })
    .catch(error => console.log(error.message));
}
