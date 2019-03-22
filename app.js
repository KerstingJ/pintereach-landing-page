/*click Lets Talk Button - CHECK
-animate the fade-in of the form
-fade out the Let's Talk Button
*/

const talkBtn = document.querySelector('address button');
const form = document.querySelector('form');

talkBtn.addEventListener('click', () => {
    form.style.display = 'inline-block';
    TweenMax.from(form, 3, { opacity: 0 });
    talkBtn.style.display = 'none';
});

//click on a selfie.  
//scale the selfie
//opacity to the remaining selfies
//fade in a bio for that member

const members = document.querySelectorAll('.member');
const articles = document.querySelectorAll('.bio');


members.forEach( member => {
    member.addEventListener('click', (event) => {

        // console.log(event)
        // console.log(event.target)
        // console.log(event.currentTarget)

        // stop this event from going into the world
        event.stopPropagation();

        // if we clicked on an already active image, lets get reset and get out of this
        if (event.currentTarget.classList.contains("clicked")) {
            clickOff();
            return
        }

        //remove .clicked from every member and bio
        members.forEach(member => {
            //get article that corresponds with member
            let bioID = member.dataset.bio;
            let bio = document.querySelector(`article[data-bio='${bioID}']`);

            //remove clicked from member and article
            member.classList.remove('clicked');
            bio.classList.remove('clicked');

            //tween out member
            TweenMax.to(member, 1, {opacity: .2, scale: .5});
        })

        //get the clicked member and associated bio
        let clickedMember = event.currentTarget;
        let bioID = clickedMember.dataset.bio;
        let clickedBio = document.querySelector(`article[data-bio='${bioID}']`);

        //set member and bio to clicked
        clickedMember.classList.add("clicked");
        clickedBio.classList.add("clicked");

        // tween our active member and bio
        TweenMax.to(clickedMember, 1, {scale: 1.3, opacity: 1});
        TweenMax.from(clickedBio, 1, {opacity: 0, delay:1, clearProps:"all"});
        
        // set bio to appropriate position
        if (bioID === 'amir')  {
            TweenMax.to(clickedBio, 1, {y: -400});
        }
    
        if (bioID === 'cynthia') {
            TweenMax.to(clickedBio, 1, {y: -400});
        }
    
        if (bioID === 'will') {
            TweenMax.to(clickedBio, 1, {y: -400, x: 300});
        }
    
        if (bioID === 'hargo') {
            TweenMax.to(clickedBio, 1, {y: -400, x: -300});
        }

        //add event listener to reset 
        window.addEventListener('click', clickOff);
        
    });
});

// reset us back to the original state of the site
const clickOff = () => {
    console.log("im really clicked off right now")
    let clickedMembers = document.querySelectorAll(".member.clicked");
    let clickedBios = document.querySelectorAll(".bio.clicked");

    clickedMembers.forEach(mem => { mem.classList.remove('clicked') });
    clickedBios.forEach(bio => bio.classList.remove('clicked'));

    //set all members back to og size
    document.querySelectorAll('.member').forEach(member => TweenMax.to(member, 1, {scale:1, opacity: 1}));

    window.removeEventListener('click', clickOff);
}