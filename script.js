const dailyBtn = document.querySelector('.daily'),
weeklyBtn = document.querySelector('.weekly'),
monthlyBtn = document.querySelector('.monthly'),
titles = document.querySelectorAll('.head > p'),
dotsBtn = document.querySelectorAll('.head img'),
hours = document.querySelectorAll('.hours'),
period = document.querySelectorAll('.period'),
prevHours = document.querySelectorAll('.hours-num'),
dailyBoxs = document.querySelectorAll('#daily'),
weeklyBoxs = document.querySelectorAll('#weekly'),
monthlyBoxs = document.querySelectorAll('#monthly');

const arr= ['daily', 'weekly', 'monthly'];
const prevArr = ['yesterday', 'last week', 'last month'];

async function getData(num){
    const data = await fetch('data.json');
    const result = await data.json();


    arr.map(el=>{
        document.querySelector(`.${el}`).style.color = 'hsl(264, 64%, 52%)';
    })

    document.querySelector(`.${arr[num]}`).style.color = 'hsl(0, 0%, 100%)';

    titles.forEach((name, i)=>{
        name.textContent = result[i].title;
    })

    hours.forEach((hour, i)=>{
        hour.textContent = result[i].timeframes[`${arr[num]}`].current + 'hrs';
    })

    period.forEach((prd, i)=>{
        prd.textContent = prevArr[num] + '-';
    })

    prevHours.forEach((prev, i)=>{
        prev.textContent = result[i].timeframes[`${arr[num]}`].previous + 'hrs';
    })
}

getData(1);

dailyBtn.addEventListener('click', ()=>{
    getData(0);
});
weeklyBtn.addEventListener('click', ()=>{
    getData(1);
});
monthlyBtn.addEventListener('click', ()=>{
    getData(2);
});

dotsBtn.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        btn.nextElementSibling.classList.toggle('none');
    })
})

async function getDataBox(num,idx){
    const data = await fetch('data.json');
    const result = await data.json();

    hours[idx].textContent = result[idx].timeframes[`${arr[num]}`].current + 'hrs';

    period[idx].textContent = prevArr[num] + '-';

    prevHours[idx].textContent = result[idx].timeframes[`${arr[num]}`].previous + 'hrs'

}

dailyBoxs.forEach((box, i)=>{
    box.addEventListener('click', ()=>{
        getDataBox(0, i);
        box.parentElement.classList.toggle('none');
    })
})

weeklyBoxs.forEach((box, i)=>{
    box.addEventListener('click', ()=>{
        getDataBox(1, i);
        box.parentElement.classList.toggle('none');
    })
})

monthlyBoxs.forEach((box, i)=>{
    box.addEventListener('click', ()=>{
        getDataBox(2, i);
        box.parentElement.classList.toggle('none');
    })
})











