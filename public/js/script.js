async function getData2() {
    return fetch('./data/guestbook.JSON')
        .then(res => res.json())
}

async function Cols() {
    let data = await getData2();
    let table = document.getElementById('guestBook');

    table.innerHTML += `<th class="header">Name</th>
                        <th class="header">Country</th>
                        <th class="header">Date</th>
                        <th class="header">Message</th>`;

    for (let index in data.guestbook) {
        let guest = data.guestbook[index];
        let date = new Date(guest.date).toDateString();

        table.innerHTML += `<tr>
            <td class="rivi">${guest.username}</td>
            <td class="rivi">${guest.country}</td>
            <td class="rivi">${date}</td>
            <td class="rivi">${guest.message}</td>
        </tr>`;
    }
}