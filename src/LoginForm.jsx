import { useState } from "react";

// bu fonksiyon, parametre olarak aldığı email geçerliyse true, değilse false döner
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());
}

const initialForm = {
  email: "",
  password: "",
  terms: false,
};

const initialErrors = {
  email: false,
  password: false,
  terms: false,
};

const errorMessages = {
  email: "Geçerli bir email adresi yaz",
  password: "Şifre en az 4 karakterden oluşmalı",
  terms: "Kullanım koşullarını kabul etmelisiniz",
};

export default function LoginForm() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);

  // formdaki inputların değerlerini güncelleyen fonksiyon

  const handleChange = (event) => {
    let { name, value, type } = event.target;
    value = type === "checkbox" ? event.target.checked : value;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: false });
    }
  };

  const validateForm = () => {
    const newErrors = {
      email: !validateEmail(formData.email),
      password: formData.password.length < 4,
      terms: !formData.terms,
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  // form submit edildiğinde çalışacak fonksiyon
  // bu fonksiyon, formdaki verileri konsola yazdırır
  // ve formun geçerliliğini kontrol eder

  function handleSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      console.log("Form geçerli, veriler gönderiliyor...", formData);
    } else {
      console.log("Form geçersiz, lütfen hataları düzeltin.");
    }
  }

  const isFormValid = () => {
    return (
      validateEmail(formData.email) &&
      formData.password.length >= 4 &&
      formData.terms
    );
  };

  return (
    <div className="form">
      <h1>Kayıt ol</h1>
      <form onSubmit={handleSubmit}>
        {/* eğer email ile ilgili bir hata varsa label'a hasError class'ı ekle */}
        <label
          className={`form-input-line ${errors.email ? "hasError" : ""}`}
          data-testid="email-label"
          style={{ display: "block" }}
        >
          <span className="form-label">Email</span>
          <input
            className="form-input"
            name="email"
            onChange={handleChange}
            value={formData.email}
            data-testid="email"
            type="text"
          />

          {/* Email ile ilgili bir hata yoksa alttaki spani hiç gösterme */}
          <span
            className="error-message"
            data-testid="email-error"
            style={{ display: errors.email ? "block" : "none" }}
          >
            {/* Email ile ilgili bir hata mesajı varsa burada görünmeli */}
            {errors.email ? errorMessages.email : ""}
          </span>
        </label>

        {/* eğer password ile ilgili bir hata varsa label'a hasError class'ı ekle */}
        <label
          data-testid="password-label"
          style={{ display: "block" }}
          className={`form-input-line ${errors.password ? "hasError" : ""}`}
        >
          <span className="form-label">Şifre</span>
          <input
            className="form-input"
            name="password"
            onChange={handleChange}
            value={formData.password}
            data-testid="password"
            type="text"
          />

          {/* Password ile ilgili bir hata yoksa alttaki spani hiç gösterme */}
          <span
            className="error-message"
            role="password-error"
            style={{ display: errors.password ? "block" : "none" }}
          >
            {/* Password ile ilgili bir hata mesajı varsa burada görünmeli */}
            {errors.password ? errorMessages.password : ""}
          </span>
        </label>

        {/* eğer terms ile ilgili bir hata varsa label'a hasError class'ı ekle */}

        <label
          style={{ display: "block" }}
          className={`form-ch-line ${errors.terms ? "hasError" : ""}`}
          data-testid="terms-label"
        >
          <input
            type="checkbox"
            name="terms"
            data-testid="terms"
            checked={formData.terms}
            onChange={handleChange}
          />
          <span className="ch-label">Kullanım koşullarını kabul ediyorum.</span>
        </label>

        {/* formdaki hata durumuna göre bu button disabled olmalı ya da olmamalı */}
        <button
          className="send-button"
          data-testid="send"
          disabled={!isFormValid()}
          style={{ backgroundColor: isFormValid() ? "green" : "gray" }}
        >
          {/* formdaki veriler geçerli ise "Gönder", değilse "Gönderilemiyor" yazmalı */}
          {isFormValid() ? "Gönder" : "Gönderilemiyor"}
        </button>
      </form>
    </div>
  );
}
