import Swal from "sweetalert2";

export const runGermanQuiz = async () => {
  let score = 0;

  const questions = [
    {
      question: 'What is the German word for "apple"?',
      options: {
        apfel: "Apfel",
        milch: "Milch",
        käse: "Käse",
        brot: "Brot",
      },
      correct: "apfel",
    },
    {
      question: 'What is the German word for "bread"?',
      options: {
        brot: "Brot",
        wasser: "Wasser",
        käse: "Käse",
        ei: "Ei",
      },
      correct: "brot",
    },
  ];

  for (const question of questions) {
    const { value: answer } = await Swal.fire({
      title: question.question,
      input: "radio",
      inputOptions: question.options,
      inputValidator: (value) => (value ? null : "Please, choose an answer."),
      confirmButtonText: "Submit",
      customClass: {
        popup: "swal-popup",
        title: "swal-title",
        confirmButton: "swal-button",
      },
      allowOutsideClick: false,
    });

    if (answer === question.correct) {
      score++;

      await Swal.fire({
        icon: "success",
        title: "Correct!",
        text: `"${question.options[answer]}" is the right answer.`,
        customClass: {
          popup: "swal-popup swal-popup--success",
          title: "swal-title",
          confirmButton: "swal-button",
        },
      });
    } else {
      await Swal.fire({
        icon: "error",
        title: "Incorrect!",
        text: `The correct answer was "${question.options[question.correct]}".`,
        customClass: {
          popup: "swal-popup swal-popup--error",
          title: "swal-title",
          confirmButton: "swal-button",
        },
      });
    }
  }

  await Swal.fire({
    icon: "info",
    title: "Quiz completed!",
    text: `You scored ${score} out of ${questions.length}.`,
    customClass: {
      popup: "swal-popup swal-popup",
      title: "swal-title",
      confirmButton: "swal-button",
    },
  });
};
