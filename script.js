
  
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(function(error) {
        console.log('Service Worker registration failed:', error);
      });
  }
  
  

  
  
// التاريخ المتوقع لأول يوم رمضان (قم بتحديثه سنويًا)
const ramadanStart = new Date('2025-02-28T00:00:00'); // تاريخ بداية رمضان 2025


// تحديث العد التنازلي
function updateCountdown() {
    const now = new Date();
    const diff = ramadanStart - now;

    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    } else {
        document.getElementById('countdown').textContent = "رمضان مبارك!";
    }
}

// استدعاء التحديث كل ثانية
setInterval(updateCountdown, 1000);
updateCountdown(); // التحديث الفوري عند تحميل الصفحة
// عرض التاريخ الحالي
function showCurrentDate() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    // تعيين النص بالتنسيق العربي
    document.getElementById('current-date').textContent = now.toLocaleDateString('ar-EG', options);
}

// استدعاء الدالة عند تحميل الصفحة
showCurrentDate();

 // الحصول على الموقع الجغرافي من المتصفح
 function getLocationAndFetchPrayerTimes() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(fetchPrayerTimes, showError);
    } else {
        alert("الموقع الجغرافي غير مدعوم في هذا المتصفح.");
    }
}

// جلب أوقات الصلاة من API باستخدام خطوط الطول والعرض
function fetchPrayerTimes(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const apiUrl = `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const timings = data.data.timings;

            // تحديث النصوص مع أوقات الصلاة
            document.getElementById('fajr-time').textContent = timings.Fajr;
            document.getElementById('sunrise-time').textContent = timings.Sunrise;
            document.getElementById('dhuhr-time').textContent = timings.Dhuhr;
            document.getElementById('asr-time').textContent = timings.Asr;
            document.getElementById('maghrib-time').textContent = timings.Maghrib;
            document.getElementById('isha-time').textContent = timings.Isha;

            // إخفاء نص التحميل وإظهار الأوقات
            document.getElementById('loading').style.display = 'none';
            document.querySelector('.prayer-times').style.display = 'flex';
        })
        .catch(error => {
            alert("حدث خطأ أثناء جلب أوقات الصلاة.");
            console.error(error);
        });
}

// عرض خطأ في حالة فشل تحديد الموقع
function showError(error) {
    alert("تعذر الحصول على الموقع الجغرافي. يرجى تمكين الموقع والمحاولة مرة أخرى.");
}

// استدعاء الوظيفة عند تحميل الصفحة
getLocationAndFetchPrayerTimes();


 // قائمة الأدعية
 const duas = [
    "اللهم اجعلنا من صيامه وقيامه.",
    "اللهم اغفر لنا وارحمنا وتب علينا.",
    "اللهم بلغنا رمضان واجعلنا فيه من المقبولين.",
    "اللهم اعتق رقابنا من النار.",
    "اللهم اجعلنا من عتقائك في هذا الشهر.",
    "اللهم اجعل القرآن ربيع قلوبنا.",
    "اللهم ارزقنا الإخلاص في القول والعمل.",
    "اللهم زدنا إيمانًا وهدى.",
    "اللهم اشفِ مرضانا ومرضى المسلمين.",
    "اللهم ارحم موتانا وموتى المسلمين."
];


// دالة لتغيير الدعاء
function showDailyDua() {
    const currentMinute = new Date().getMinutes();
    const duaIndex = currentMinute % duas.length; // اختيار دعاء بناءً على الدقيقة الحالية
    document.getElementById('dua-text').textContent = duas[duaIndex];
}

// استدعاء الدالة كل 5 دقائق (300000 ميلي ثانية)
showDailyDua(); // عرض الدعاء فورًا عند تحميل الصفحة
setInterval(showDailyDua, 300000); // تحديث الدعاء كل 5 دقائق


      // لتوليد تساقط الصور
      function createFallingImages() {
        const totalImages = 100;  // عدد الصور التي ستتساقط
        const imageUrls = [
            'lantern.png', // استبدل هذا الرابط برابط صورتك
            // يمكنك إضافة روابط أخرى إذا أردت
        ];
    
        for (let i = 0; i < totalImages; i++) {
            const img = document.createElement('img');
            img.src = imageUrls[Math.floor(Math.random() * imageUrls.length)]; // اختيار صورة عشوائيّة

            img.classList.add('falling-image');

            // تعيين حركة عشوائية للصور
            const size = Math.random() * 30 + 10; // حجم الصورة عشوائي
            img.style.width = `${size}px`;
            img.style.animationDuration = `${Math.random() * 3 + 5}s`; // سرعة مختلفة لتساقط الصور
            img.style.animationDelay = `${Math.random() * 5}s`; // تأخير مختلف لكل صورة
            
            // تعيين موضع الصورة
            img.style.left = `${Math.random() * 100}vw`; // تحديد مكان العروض العشوائي للصورة

            // إضافة الصورة إلى الصفحة
            document.body.appendChild(img);
        }
    }

    // استدعاء الدالة عند تحميل الصفحة
    window.onload = createFallingImages;

   // قائمة بأسماء السور
   const surahs = [
    "الفاتحة", "البقرة", "آل عمران", "النساء", "المائدة",
    "الأنعام", "الأعراف", "الأنفال", "التوبة", "يونس",
    "هود", "يوسف", "الرعد", "إبراهيم", "الحجر",
    "النحل", "الإسراء", "الكهف", "مريم", "طه",
    "الأنبياء", "الحج", "المؤمنون", "نور", "الفرقان",
    "الشعراء", "النمل", "القصص", "العنكبوت", "الروم",
    "لقمان", "السجدة", "الأحزاب", "سبأ", "فاطر",
    "يس", "الصافات", "ص", "الزمر", "غافر",
    "فصلت", "الشورى", "الزخرف", "الدخان", "الجاثية",
    "الأحقاف", "محمد", "الفتح", "الحجرات", "ق",
    "الذاريات", "الطور", "النجم", "القمر", "الرحمن",
    "الواقعة", "الحديد", "المجادلة", "الحشر", "الممتحنة",
    "الصف", "الجمعة", "المنافقون", "التغابن", "الطلاق",
    "التحريم", "الملك", "القلم", "الحاقة", "المعارج",
    "نوح", "الجن", "المزمل", "المدثر", "القيامة",
    "الإنسان", "المرسلات", "النبأ", "النازعات", "عبس",
    "التكوير", "الانفطار", "المطففين", "الانشقاق", "البروج",
    "الطارق", "الأعلى", "الغاشية", "الفجر", "البلد",
    "الشمس", "الليل", "الضحى", "الشرح", "التين",
    "العلق", "القدر", "البينة", "الزلزلة", "العاديات",
    "القارعة", "التكاثر", "العصر", "الهمزة", "الفيل",
    "قريش", "الماعون", "الكوثر", "الكافرون", "النصر",
    "المسد", "الإخلاص", "الفلق", "الناس"
  ];

  function generateQuranPlan() {
    const days = parseInt(document.getElementById('days-input').value);
    const surahsPerDay = Math.ceil(surahs.length / days); // عدد السور لكل يوم
    const tableBody = document.getElementById('plan-table-body');
    tableBody.innerHTML = ""; // تفريغ الجدول السابق
    
    let currentSurahIndex = 0;

    for (let day = 1; day <= days; day++) {
      const startSurah = surahs[currentSurahIndex];
      const endSurahIndex = Math.min(currentSurahIndex + surahsPerDay - 1, surahs.length - 1);
      const endSurah = surahs[endSurahIndex];

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${day}</td>
        <td>${startSurah}</td>
        <td>${endSurah}</td>
      `;

      tableBody.appendChild(row);

      // التحقق من عدم تجاوز حدود المصفوفة
      currentSurahIndex = endSurahIndex + 1;
      if (currentSurahIndex >= surahs.length) break;
    }
  }





generateQuranPlan();
function fetchIftarAndSuhoor(latitude, longitude) {
    const apiUrl = `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const timings = data.data.timings;
            const iftar = timings.Maghrib;
            const suhoor = timings.Fajr;
            document.getElementById('prayers').textContent = `
                السحور: ${suhoor} - الإفطار: ${iftar}
            `;
        })
        .catch(error => {
            console.error('Error fetching iftar and suhoor times:', error);
        });
}


function fetchPrayerTimes(latitude, longitude) {
    const apiUrl = `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const timings = data.data.timings;
            const iftar = timings.Maghrib;
            const suhoor = timings.Fajr;

            document.getElementById('prayers').textContent = `
                السحور: ${suhoor} - الإفطار: ${iftar}
            `;

            setupIftarAlarm(iftar);
        })
        .catch(() => {
            document.getElementById('prayers').textContent = "تعذر جلب أوقات الصلاة.";
        });
}

function setupIftarAlarm(iftarTime) {
    const [hours, minutes] = iftarTime.split(':').map(Number);
    const now = new Date();
    const iftarDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

    const alarmAudio = new Audio('iftar.mp3'); // استبدل بـ مسار الصوت الخاص بك

    const timeUntilIftar = iftarDate - now;

    if (timeUntilIftar > 0) {
        setTimeout(() => {
            alarmAudio.play();
            alert("حان وقت الإفطار! رمضان كريم 🌙");
        }, timeUntilIftar);
    }
}



// تأثير انتقال سلس
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

const backToTopButton = document.getElementById('back-to-top');

window.onscroll = function () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

function fetchPrayerTimesWithIcons(latitude, longitude) {
    const apiUrl = `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const timings = data.data.timings;
            document.getElementById('suhoor-time').textContent = timings.Imsak;
            document.getElementById('fajr-time').textContent = timings.Fajr;
            document.getElementById('dhuhr-time').textContent = timings.Dhuhr;
            document.getElementById('asr-time').textContent = timings.Asr;
            document.getElementById('maghrib-time').textContent = timings.Maghrib;
            document.getElementById('isha-time').textContent = timings.Isha;
        })
        .catch(() => {
            alert("تعذر جلب أوقات الصلاة.");
        });
}

// استدعاء الدالة مع الموقع الجغرافي للمستخدم
navigator.geolocation.getCurrentPosition(
    position => fetchPrayerTimesWithIcons(position.coords.latitude, position.coords.longitude),
    () => alert("يرجى السماح بالوصول إلى الموقع.")
);

 

// استدعاء الوظيفة عند تحميل الصفحة




document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.querySelector('#quran-month-plan tbody');

    for (let day = 1; day <= 30; day++) {
        const row = document.createElement('tr');

        // عمود اليوم
        const dayCell = document.createElement('td');
        dayCell.textContent = `${day} رمضان`;
        row.appendChild(dayCell);

        // عمود الأجزاء
        const partsCell = document.createElement('td');
        const startPart = day; // الجزء الأول لليوم
        const endPart = day; // يمكن تعديله إذا أردت دمج أكثر من جزء
        partsCell.textContent = `الجزء ${startPart}`;
        row.appendChild(partsCell);
        const statusCell = document.createElement('td');
statusCell.textContent = 'غير مكتمل'; // أو تخصيصها بناءً على القراءة
row.appendChild(statusCell);


        // إضافة الصف إلى الجدول
        tbody.appendChild(row);
    }
});


// إضافة تأثير التمرير
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section');
    const triggerBottom = window.innerHeight / 5 * 4;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if(sectionTop < triggerBottom) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
});

// تأثير عند التمرير لعرض أفكار النجاح
window.addEventListener('scroll', function() {
    const ideasSections = document.querySelectorAll('.success-ideas');
    const triggerBottom = window.innerHeight / 5 * 4;

    ideasSections.forEach(idea => {
        const ideaTop = idea.getBoundingClientRect().top;
        if(ideaTop < triggerBottom) {
            idea.classList.add('active');
        } else {
            idea.classList.remove('active');
        }
    });
});

// تأثير عند التمرير لتفعيل الخطة
window.addEventListener('scroll', function() {
    const lifePlanSections = document.querySelectorAll('.life-plan');
    const triggerBottom = window.innerHeight / 5 * 4;

    lifePlanSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if(sectionTop < triggerBottom) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
});






// التحديث المستمر
setInterval(updateCountdown, 1000);
showCurrentDate();
getLocationAndFetchPrayerTimes();

