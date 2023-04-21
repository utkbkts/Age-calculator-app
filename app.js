// Formda bulunan tarih alanlarını seçin
const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");
const error = document.querySelector(".errors")

// Yaş hesaplama fonksiyonu
function calculateAge() {
  // Kullanıcının doğum tarihini alın
  const userDOB = new Date(year.value, month.value - 1, day.value);

  // Şu anki tarihi alın
  const currentDate = new Date();

  // Yıl farkını hesaplayın
  let ageInYears = currentDate.getFullYear() - userDOB.getFullYear();

  // Ay farkını hesaplayın
  let ageInMonths = (currentDate.getMonth() + 1) - (userDOB.getMonth() + 1);

  // Gün farkını hesaplayın
  let ageInDays = currentDate.getDate() - userDOB.getDate();

  // Yaşın tam olarak hesaplanması için düzeltmeler yapın
  if (ageInMonths < 0 || (ageInMonths === 0 && ageInDays < 0)) {
    ageInYears--;
    ageInMonths += 12;
  }
  if (ageInDays < 0) {
    const daysInLastMonth = new Date(userDOB.getFullYear(), userDOB.getMonth() + 1, 0).getDate();
    ageInDays += daysInLastMonth;
    ageInMonths--;
  }

  // Sonuçları HTML'de gösterin
  const yearElement = document.querySelector(".year");
  const monthElement = document.querySelector(".month");
  const dayElement = document.querySelector(".day");
  yearElement.textContent = ageInYears;
  monthElement.textContent = ageInMonths;
  dayElement.textContent = ageInDays;
}

// Submit düğmesine click olayı dinleyicisi ekleyin
const submitBtn = document.querySelector(".submit-btn");
submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  calculateAge();
  validate()
  
 
});

// HATA MESAJI
function validate() {
  const inputs = document.querySelectorAll("input"); 
  let validator = true;
  inputs.forEach((i) => {
    const parent = i.parentElement;
    if (!i.value) {
      i.style.borderColor = "red";
      parent.querySelector("small").innerText = "this field is required.";
      validator = false;
    } else if (month.value > 12) {
        month.style.borderColor = "red";
        month.parentElement.querySelector("small").innerText = "must be valid month.";
        validator = false;
    } else if (day.value > 31) {
        day.style.borderColor = "red";
        day.parentElement.querySelector("small").innerText =
          "must be valid day.";
        validator = false;
    } else {
      i.style.borderColor = "black";
      parent.querySelector("small").innerText = "";
      validator = true;
    }
  });
  return validator;
}
