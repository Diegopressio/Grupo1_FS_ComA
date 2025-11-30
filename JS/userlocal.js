 // Si el servidor redirige con ?user=nombre, guardarlo en localStorage temprano
    (function(){
        try{
            var params = new URLSearchParams(window.location.search);
            if(params.has('user')){
                var u = params.get('user');
                if(u){
                    localStorage.setItem('currentUser', JSON.stringify({ username: decodeURIComponent(u) }));
                }
                var clean = window.location.pathname + window.location.hash;
                history.replaceState(null, '', clean);
            }
        }catch(e){}
    })();