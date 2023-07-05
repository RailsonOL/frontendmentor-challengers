document.addEventListener('DOMContentLoaded', function () {
    let ratingNumbers = document.querySelectorAll('span.rating-number');
    let submitButton = document.querySelector('.custom-submit > input');

    ratingNumbers.forEach((ratingNumber) => {
        ratingNumber.addEventListener('click', () => {
            // Remove a classe "active" de todos os elementos de rating number
            ratingNumbers.forEach((element) => {
                element.classList.remove('active');
            });

            // Adiciona a classe "active" apenas ao rating number clicado
            ratingNumber.classList.add('active');
        });
    });

    submitButton.addEventListener('click', () => {
        let ratingNumberActive = document.querySelector('span.rating-number.active');
        let ratingNumberActiveValue = ratingNumberActive.innerHTML;

        alert(`Você deu ${ratingNumberActiveValue} estrelas!`);
    }
    );
});
