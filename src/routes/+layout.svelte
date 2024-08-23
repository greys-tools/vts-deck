<script>
  import "../app.css";
</script>

<svelte:head>
  <script>
    var prefer = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if ('settings' in localStorage) {
      var st = JSON.parse(localStorage.getItem('settings'));
      if(st.theme == 'dark' || (st.theme == 'system' && prefer)) window.document.documentElement.classList.add('dark');
      else if(st.theme == 'light') window.document.documentElement.classList.remove('dark');
    } else if(prefer) {
      window.document.documentElement.classList.add('dark');  
    }
  </script>
</svelte:head>

<slot />