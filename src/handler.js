// handleInfo.js

import Login from "./view/login/Login";

const handleLoginInfo = (data) => {
    data = JSON.parse(String(data));
    console.log(data);
    const casa_Id = String(data.houseId);
    const usuario_Id = String(data.userId);
    if (casa_Id && usuario_Id) {
        Login.setParameters(casa_Id, usuario_Id).then(r => console.log(r)).catch(e => console.error(e));
    } else {
        throw new Error("Login error");
    }
}

module.exports = handleLoginInfo;