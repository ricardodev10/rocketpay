import "./css/index.css";
import IMask from "imask";

const ccBg = document.querySelector(".cc");
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img");

function setCardType(type) {
  const colors = {
    visa: {
      ccBg: "url('/cc-bg-visa.svg')",
    },
    mastercard: {
      ccBg: "url('/cc-bg-mastercard.svg')",
    },
    americanExpress: {
      ccBg: "url('/cc-bg-americanExpress.svg')",
    },
    hipercard: {
      ccBg: "url('/cc-bg-hipercard.svg')",
    },
    elo: {
      ccBg: "url('/cc-bg-elo.svg')",
    },
    default: {
      ccBg: "url('/cc-bg-default.svg')",
    },
  };

  ccBg.style.backgroundImage = colors[type].ccBg;
  ccLogo.setAttribute("src", `cc-${type}.svg`);
}

const securityCode = document.querySelector("#security-code");
const expirationDate = document.querySelector("#expiration-date");
const cardNumber = document.querySelector("#card-number");
const cardHolder = document.querySelector("#card-holder");
const addButton = document.querySelector("#add-card");

const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^3[47]\\d{0,13}/,
      cardtype: "american-express",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^606282|^3841(?:[0|4|6]{1})0/,
      cardtype: "hipercard",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^6\d{0,15}/,
      cardtype: "elo",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "");
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex);
    });

    return foundMask;
  },
};

const cardHolderPattern = {
  mask: /[a-zA-Z\s]$/,
};

const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
  },
};

const securityCodePattern = {
  mask: "0000",
};

const cardNumberMasked = IMask(cardNumber, cardNumberPattern);
const cardHolderMasked = IMask(cardHolder, cardHolderPattern);
const expirationDateMasked = IMask(expirationDate, expirationDatePattern);
const securityCodeMasked = IMask(securityCode, securityCodePattern);

function updateCardNumber(number) {
  const ccNumber = document.querySelector(".cc-number");

  ccNumber.innerText = number.length === 0 ? "1234 5678 9012 3456" : number;
}

function updateCardHolder(name) {
  const ccHolder = document.querySelector(".cc-holder .value");

  ccHolder.innerText = cardHolder.value.length === 0 ? "FULANO DA SILVA" : name;
}

function updateExpirationDate(date) {
  const ccExpiration = document.querySelector(".cc-expiration .value");

  ccExpiration.innerText = date.length === 0 ? "02/32" : date;
}

function updateSecurityCode(code) {
  const ccSecurity = document.querySelector(".cc-security .value");

  ccSecurity.innerText = securityCode.value.length === 0 ? "123" : code;
}

cardNumberMasked.on("accept", () => {
  const cardType = cardNumberMasked.masked.currentMask.cardtype;
  setCardType(cardType);
  updateCardNumber(cardNumberMasked.value);
});

cardHolderMasked.on("accept", () => {
  updateCardHolder(cardHolderMasked.value);
});

expirationDateMasked.on("accept", () => {
  updateExpirationDate(expirationDateMasked.value);
});

securityCodeMasked.on("accept", () => {
  updateSecurityCode(securityCodeMasked.value);
});

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
});

addButton.addEventListener("click", () => {
  alert("Cartão adicionado!");
});

// 25/11/2022
