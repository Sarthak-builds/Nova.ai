 import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";


const supabase = createClient(supabaseUrl, supabaseKey);
const authBtn= document.querySelector("#auth-btn");
const toggleBtn= document.querySelector("#toggle-signup");
const authForm = document.querySelector('#auth-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const googleBtn= document.querySelector("#google-login");
// console.log(authBtn)
//first we will learn how to toglle the text of signup and sign in btns...
let isSignedUp = false;
toggleBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    isSignedUp= !isSignedUp;//change value
    authBtn.textContent=isSignedUp?'Sign Up': 'Sign In';
    toggleBtn.textContent=isSignedUp?'Sign In': 'Sign Up'; //dono ulte honge ek dusre ke.
     document.querySelector('.auth-toggle p').textContent = isSignedUp ? 'Already have an account?' : 'Don\'t have an account?';
});
authForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const email=emailInput.value.trim();
    const password= passwordInput.value.trim();
     if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }
    try {
        let result;
        if (isSignedUp) {
            result = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        username: email.split('@')[0]
                    }
                }
            }
        
    );
    if (result.error) {
                alert(result.error.message);
                return;
            }
    //  alert('Sign up successful! Please check your email for verification.');
      emailInput.value = '';
            passwordInput.value = '';
            
            // Redirect after a short delay
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
    // window.location.href='http://127.0.0.1:5500/index.html';
    // window.location.href= 'http://127.0.0.1:5500/index.html';
        } else {
            result = await supabase.auth.signInWithPassword({ email, password });
        }
       if (result.error) {
            alert(result.error.message);
        } else {
            alert(isSignedUp ? 'Sign up successful! Check your email.' : 'Logged in successfully!');
            window.location.href = 'index.html';
        }
       window.location.href= 'http://127.0.0.1:5500/index.html'; 
    }
    // window.location.href='index.html';//redirect to main wala app
    catch (error){
       console.error('Auth error:', error);
        alert('An error occurred. Please try again.');
}
});

//google oauth login 
googleBtn.addEventListener('click', async () => {
    try {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
          options: {
                redirectTo: window.location.origin + '/index.html'
            }

        });
        if (error) throw error;
    } catch (error) {
        console.error('OAuth error:', error);
        alert('Google login failed. Please try again.');
    }
});
//used grok for this refreshing of tokens
supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'TOKEN_REFRESHED') {
        console.log('Session refreshed', session);
    } else if (event === 'SIGNED_OUT') {
        console.log('User signed out');
        alert('Your session has expired. Please log in again.');
        window.location.href = 'auth.html';
    }
});

setInterval(async () => {
    const { data, error } = await supabase.auth.refreshSession();
    if (error) console.error('Refresh error:', error.message);
}, 300000); // Refresh every 5 minutes
