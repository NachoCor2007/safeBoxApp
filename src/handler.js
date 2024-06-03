// handleInfo.js

const handleLoginInfo = (data) => {
    data = JSON.parse(String(data));
    console.log(data);
    const casa_Id = String(data.houseId);
    const usuario_Id = String(data.userId);
    if (casa_Id && usuario_Id) {
        sessionStorage.setItem("Casa_Id", casa_Id);
        sessionStorage.setItem("Usuario_Id", usuario_Id);
    } else {
        throw new Error("Login error");
    }
}

module.exports = handleLoginInfo;