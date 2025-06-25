document.addEventListener('DOMContentLoaded', () => {
  const openModalBtn = document.getElementById('openModalBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modal = document.getElementById('loginModal');
  const form = document.getElementById('userForm');
  const userInfo = document.getElementById('userInfo');

  // Spans to display user info
  const dispName = document.getElementById('dispName');
  const dispEmail = document.getElementById('dispEmail');
  const dispIdentity = document.getElementById('dispIdentity');

  openModalBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
  });

  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const identity = document.getElementById('identity').value.trim();

    if (!name || !email) {
      alert('Please enter your name and email.');
      return;
    }

    // Prepare user profile
    const profileData = {
      "Name": name,
      "Email": email,
      ...(identity && { "Identity": identity })
    };

    // Push to CleverTap
    clevertap.onUserLogin.push({ "Site": profileData });
    clevertap.event.push("Popup Login Submitted");

    // Display confirmation and user data
    alert("✅ User has been created on CleverTap!");

    dispName.textContent = name;
    dispEmail.textContent = email;
    dispIdentity.textContent = identity || "N/A";

    userInfo.style.display = 'block';
    modal.style.display = 'none';
    form.reset();
  });
});
