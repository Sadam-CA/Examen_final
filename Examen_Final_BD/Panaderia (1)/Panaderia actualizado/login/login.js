// Función para iniciar sesión
function iniciarSesion() {
    const correo = document.getElementById("login-correo").value;
    const contraseña = document.getElementById("login-contraseña").value;
    
    if (!correo || !contraseña) {
      alert("Por favor, complete todos los campos.");
      return;
    }
  
    // Verificamos si el usuario está registrado en el almacenamiento local
    const usuarioRegistrado = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioEncontrado = usuarioRegistrado.find(usuario => usuario.correo === correo && usuario.contraseña === contraseña);
  
    if (usuarioEncontrado) {
      // Si el usuario está registrado, lo dejamos entrar
      localStorage.setItem("cliente", correo);
      window.location.href = "resumen_carrito.html";  // Redirige al resumen del carrito
    } else {
      // Si no está registrado o la contraseña no coincide, mostramos un error
      alert("Usuario o contraseña incorrectos. ¿Aún no estás registrado? Puedes registrarte.");
    }
  }
  
  // Función para registrarse
  function registrarse() {
    const nombre = document.getElementById("registro-nombre").value;
    const correo = document.getElementById("registro-correo").value;
    const contraseña = document.getElementById("registro-contraseña").value;
    const telefono = document.getElementById("registro-telefono").value;
    const direccion = document.getElementById("registro-direccion").value;
  
    if (!nombre || !correo || !contraseña || !telefono) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }
  
    // Verificamos si el correo ya está registrado
    const usuarioRegistrado = JSON.parse(localStorage.getItem("usuarios")) || [];
    const correoExistente = usuarioRegistrado.find(usuario => usuario.correo === correo);
  
    if (correoExistente) {
      // Si ya existe un usuario con ese correo, mostramos un mensaje de error
      alert("Este correo ya está registrado. Inicia sesión.");
      return;
    }
  
    // Guardamos el nuevo usuario
    const nuevoUsuario = { nombre, correo, contraseña, telefono, direccion };
    usuarioRegistrado.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarioRegistrado));
    
    // Simulamos un registro exitoso
    alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
  
    // Limpiamos los campos de registro
    document.getElementById("form-registro").reset();
  }
  
  