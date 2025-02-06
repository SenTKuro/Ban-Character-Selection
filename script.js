fetch("operators.json")
    .then(response => response.json())
    .then(operators => {
        const tableBody = document.getElementById('operatorTable').getElementsByTagName('tbody')[0];

        operators.forEach((op, index) => {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = op.name;
            row.insertCell(1).innerHTML = `<input type="checkbox" id="ban_${index}" value="${op.name}">`;
        });
    });

function submitBan() {
    const selectedOperators = [];
    document.querySelectorAll("input[type='checkbox']:checked").forEach(checkbox => {
        selectedOperators.push(checkbox.value);
    });

    if (selectedOperators.length > 0) {
        alert(`คุณได้แบนตัวละคร: ${selectedOperators.join(', ')}`);

        // อัปเดตไฟล์ banned.json
        fetch("banned.json", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ banned: selectedOperators })
        }).then(() => {
            // ส่งข้อมูลที่ถูกแบนไปยัง ban-character-overlay ผ่าน GitHub Pages
            fetch("https://sentkuro.github.io/ban-character-overlay/banned.json", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ banned: selectedOperators })
            });
        });

    } else {
        alert("กรุณาเลือกตัวละครที่ต้องการแบน");
    }
}
