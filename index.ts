class NegativeAgeError extends Error {
  constructor() {
    super("Возраст не может быть отрицательым");
    this.name = "NegativeAgeError";
  }
}

class FutureBirthdayYearError extends Error {
  constructor() {
    super("Год рождения не может быть выше 2020");
    this.name = "FutureBirthdayYearError";
  }
}

const validatorAge = (age: number) => {
  if (age < 0) throw new NegativeAgeError();
};

const validatorYear = (year: number) => {
  if (year > 2020) throw new FutureBirthdayYearError();
};

async function promptInput<T>(
  message: string,
  validator: (input: T) => void
): Promise<T> {
  let input: string | null;
  let parsedInput: T;

  while (true) {
    input = prompt(message);
    if (input === null) {
      throw new Error("Ввод был отменён пользователем");
    }

    try {
      parsedInput = JSON.parse(input);
      validator(parsedInput);
      return parsedInput;
    } catch (e) {
      if (e instanceof SyntaxError) {
        console.log("Ошибка преобразования данных");
      } else if (e instanceof Error) {
        console.log(e.message);
      }
    }
  }
}

async function main() {
  try {
    const age = await promptInput<number>("Введите ваш возраст", validatorAge);
    const birthdayAge = await promptInput<number>(
      "Введите ваш год рождения",
      validatorYear
    );

    console.log(`Ваш возраст ${age}`);
    console.log(`Ваш год рождения: ${birthdayAge}`);
  } catch (e) {
    if (e instanceof Error) {
      console.log(`${e.name} | ${e.message}`);
    }
  }
}

main()
