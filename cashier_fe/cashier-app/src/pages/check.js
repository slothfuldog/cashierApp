let sevenDaysAgo = new Date().setDate(new Date().getDate() - 7);
let sevenDays = new Date(sevenDaysAgo)
let dd = String(sevenDays.getDate()).padStart(2, '0');
            let mm = String(sevenDays.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = sevenDays.getFullYear();
sevenDaysAgo = yyyy + '-' + mm + '-' + dd;