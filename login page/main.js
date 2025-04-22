// === Landing Screen Transition ===
window.onload = () => {
    const landing = document.getElementById("landing");
    const authSection = document.getElementById("authSection");

    if (landing && authSection) {
        setTimeout(() => {
            landing.style.display = "none";
            authSection.style.display = "block";
        }, 3000); // 3-second delay
    }
};

// === Firebase Login ===
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        console.log("Login attempt with email:", email); // Debug log
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            alert("✅ Logged in successfully!");
            // Redirect or show dashboard here
            // window.location.href = "dashboard.html";
        } catch (err) {
            console.error("Firebase Login Error:", err); // Debug log
            alert("❌ Login failed: " + err.message);
        }
    });
}

// === Forgot Password ===
const forgotPasswordLink = document.getElementById("forgotPasswordLink");
const resetPasswordSection = document.getElementById("resetPasswordSection");
const resetPasswordForm = document.getElementById("resetPasswordForm");
const resetSuccessSection = document.getElementById("resetSuccessSection");
const backToLoginFromResetLink = document.getElementById("backToLoginFromResetLink");
const backToLoginFromSuccessLink = document.getElementById("backToLoginFromSuccessLink");

if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("Forgot Password link clicked"); // Debug log
        loginForm.style.display = "none";
        resetPasswordSection.style.display = "block";
        resetSuccessSection.style.display = "none";
    });
}

if (resetPasswordForm) {
    resetPasswordForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        console.log("Password reset requested for email:", email); // Debug log

        try {
            await firebase.auth().sendPasswordResetEmail(email);
            console.log("Password reset email sent to:", email); // Debug log
            resetPasswordSection.style.display = "none";
            resetSuccessSection.style.display = "block";
        } catch (err) {
            console.error("Firebase Password Reset Error:", err); // Debug log
            if (err.code === "auth/user-not-found") {
                alert("❌ No account found with this email.");
            } else if (err.code === "auth/invalid-email") {
                alert("❌ Please enter a valid email address.");
            } else {
                alert("❌ Password reset failed: " + err.message);
            }
        }
    });
}

if (backToLoginFromResetLink) {
    backToLoginFromResetLink.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("Back to Login from reset link clicked"); // Debug log
        resetPasswordSection.style.display = "none";
        loginForm.style.display = "block";
    });
}

if (backToLoginFromSuccessLink) {
    backToLoginFromSuccessLink.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("Back to Login from success link clicked"); // Debug log
        resetSuccessSection.style.display = "none";
        loginForm.style.display = "block";
    });
}

// === Firebase Registration ===
const registerForm = document.getElementById("registerForm");
const verificationSection = document.getElementById("verificationSection");
const verifyEmailBtn = document.getElementById("verifyEmailBtn");

if (registerForm) {
    console.log("Register form detected, attaching event listener"); // Debug log
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        console.log("Register form submitted"); // Debug log

        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const confirmPassword = e.target[3].value;

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("❌ Please enter a valid email address!");
            return;
        }

        // Password match and length check
        if (password !== confirmPassword) {
            alert("❌ Passwords do not match!");
            return;
        }
        if (password.length < 6) {
            alert("❌ Password must be at least 6 characters long!");
            return;
        }

        try {
            console.log("Attempting to create user with email:", email); // Debug log
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Send verification email
            await user.sendEmailVerification();
            console.log("Verification email sent to:", email); // Debug log
            alert("✅ Verification email sent! Please check your email and click the verification link.");

            // Hide form and show verification section
            registerForm.style.display = "none";
            verificationSection.style.display = "block";
        } catch (err) {
            console.error("Firebase Registration Error:", err); // Debug log
            alert("❌ Registration failed: " + err.message);
        }
    });
}

if (verifyEmailBtn) {
    verifyEmailBtn.addEventListener("click", async () => {
        console.log("Verify Email button clicked"); // Debug log
        try {
            const user = firebase.auth().currentUser;
            if (user) {
                // Reload user data to get latest emailVerified status
                await user.reload();
                if (user.emailVerified) {
                    console.log("Email verified for:", user.email); // Debug log
                    alert("✅ Email verified! Account created successfully.");
                    window.location.href = "index.html"; // Redirect to login page
                } else {
                    console.log("Email not verified for:", user.email); // Debug log
                    alert("❌ Email not verified. Please click the link in your email.");
                }
            } else {
                console.log("No user signed in"); // Debug log
                alert("❌ No user found. Please register again.");
            }
        } catch (err) {
            console.error("Firebase Verification Error:", err); // Debug log
            alert("❌ Verification failed: " + err.message);
        }
    });
}

// === Firebase Google Sign-In ===
const googleBtn = document.getElementById("googleLoginBtn");
if (googleBtn) {
    console.log("Google Sign-In button detected, attaching event listener"); // Debug log
    googleBtn.addEventListener("click", async () => {
        console.log("Google Sign-In initiated"); // Debug log
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            console.log("Google Auth Provider created"); // Debug log
            const result = await firebase.auth().signInWithPopup(provider);
            console.log("Google Sign-In successful, user:", result.user.email); // Debug log
            alert("✅ Google login successful!");
            // Redirect to dashboard or homepage
            // window.location.href = "dashboard.html";
        } catch (err) {
            console.error("Firebase Google Sign-In Error:", err); // Debug log
            if (err.code === "auth/popup-blocked") {
                alert("❌ Google login failed: Popup blocked. Please allow popups for this site.");
            } else {
                alert("❌ Google login failed: " + err.message);
            }
        }
    });
}