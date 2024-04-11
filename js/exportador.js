function eleccion() {
    const formatoElegido = document.getElementById('generarFormato').value;
    var alumnos = document.getElementById('mostrarAlumnos');
    if (formatoElegido == 0 || !alumnos) {
        return
    }
    switch (formatoElegido) {
        case "csv":
            generarCSV(alumnos);
            break;
        case "json":
            generarJSON(alumnos);
            break;
        case "sql":
            generarSQL(alumnos);
            break;
        case "xml":
            generarXML(alumnos);
            break;
        default:
            console.warn("Formato invalido");
    }

};
function generarCSV(alumnos) {
    var file = document.createElement('a');
    var salida = "";
    var alumnos2 = alumnos.innerHTML.split("<br>");

    for (var i = 0; i < alumnos2.length; i++) {
        if (alumnos2[i]) {
            salida += alumnos2[i] + "\n";
        }
    }

    file.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(salida));
    file.setAttribute('download', 'alumnos.csv');
    file.style.display = 'none';
    document.body.appendChild(file);
    file.click();
    document.body.removeChild(file);
}

function generarJSON(alumnos) {
    var file = document.createElement('a');
    var salida = [];
    var alumnos2 = alumnos.innerHTML.split("<br>");

    for (var i = 0; i < alumnos2.length; i++) {
        if (alumnos2[i]) {
            var alumno = alumnos2[i].split(", ");
            salida.push({
                expediente: alumno[0],
                apellido1: alumno[1],
                apellido2: alumno[2],
                nombre: alumno[3],
                correo: alumno[4],
                fechaNacimiento: alumno[5]
            });
        }
    }

    var jsonSalida = JSON.stringify(salida, null, 2);
    file.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(jsonSalida));
    file.setAttribute('download', 'alumnos.json');
    file.style.display = 'none';
    document.body.appendChild(file);
    file.click();
    document.body.removeChild(file);
}

function generarSQL(alumnos) {
    var file = document.createElement('a');
    var salida = "CREATE DATABASE IF NOT EXISTS evento;\n USE evento;\nCREATE TABLE IF NOT EXISTS asistentes(expediente INT NOT NULL, apellido1 VARCHAR(255), apellido2 VARCHAR(255), nombre VARCHAR(255), correo VARCHAR(255) NOT NULL, fechaNacimiento DATE);\n INSERT INTO asistentes (expediente, apellido1, apellido2, nombre, correo, fechaNacimiento) VALUES\n";
    var alumnos2 = alumnos.innerHTML.split("<br>");

    for (var i = 0; i < alumnos2.length; i++) {
        if (alumnos2[i]) {
            var alumno = alumnos2[i].split(", ");
            salida += "('" + alumno[0] + "', '" + alumno[1] + "', '" + alumno[2] + "', '" + alumno[3] + "', '" + alumno[4] + "', '" + alumno[5] + "'),\n";
        }
    }

    salida = salida.slice(0, -2) + ";";
    file.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(salida));
    file.setAttribute('download', 'alumnos.sql');
    file.style.display = 'none';
    document.body.appendChild(file);
    file.click();
    document.body.removeChild(file);
}
function generarXML(alumnos) {
    var file = document.createElement('a');
    var salida = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<asistentes>\n";
    var alumnos2 = alumnos.innerHTML.split("<br>");

    for (var i = 0; i < alumnos2.length; i++) {
        if (alumnos2[i]) {
            var alumno = alumnos2[i].split(", ");
            salida += "  <asistente>\n";
            salida += "    <expediente>" + alumno[0] + "</expediente>\n";
            salida += "    <apellido1>" + alumno[1] + "</apellido1>\n";
            salida += "    <apellido2>" + alumno[2] + "</apellido2>\n";
            salida += "    <nombre>" + alumno[3] + "</nombre>\n";
            salida += "    <correo>" + alumno[4] + "</correo>\n";
            salida += "    <fechaNacimiento>" + alumno[5] + "</fechaNacimiento>\n";
            salida += "  </asistente>\n";
        }
    }

    salida += "</asistentes>";
    file.setAttribute('href', 'data:text/xml;charset=utf-8,' + encodeURIComponent(salida));
    file.setAttribute('download', 'alumnos.xml');
    file.style.display = 'none';
    document.body.appendChild(file);
    file.click();
    document.body.removeChild(file);
}