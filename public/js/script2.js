let msgForm = document.getElementById("form");

function writeMsg(message) {
        let data =  message;
        let table = document.getElementById('messages');
    
        table.innerHTML += `<th class="header">Username</th>
                            <th class="header">Country</th>
                            <th class="header">Message</th>`;
    
        for (let message of data) {
            
    
            table.innerHTML += `<tr>
                <td class="rivi">${message.name}</td>
                <td class="rivi">${message.country}</td>
                <td class="rivi">${message.message}</td>
            </tr>`;
        }
}

msgForm.addEventListener("submit", function(event){
    event.preventDefault();
    let formData = new FormData(event.target);
    let name = formData.get("name");
    let country = formData.get("country");
    let message = formData.get("message");
    console.log(name + country + message);

    let data = {'name': name, 'country': country, 'message': message };
    let post = JSON.stringify(data);
    console.log(post);
    fetch("/ajaxmessage.html", {
        method: 'POST',
        body: post,
        headers: {
            'Content-Type': "application/json"
        }
    }).then((response) => {
        console.log(response);
        return response.json();
    }).then((res) => {
        console.log(res);
        writeMsg(res);
    }).catch((error) => {
        console.log(error);
    })
});