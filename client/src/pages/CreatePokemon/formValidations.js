export const formValidator = (form) => {
    const {
      name,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
      image,
      types
    } = form;
  
    let errors = {
      name: "",
      attack: "",
      life: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      image: "",
      types: ""
};

const onlyNumbers = new RegExp('^[0-9]*$');
const imageUrl = new RegExp(/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/)
const maxStat = 201;


  if (!name) {
    errors.name = "No name provided";
  } else if (name.length > 20) {
    errors.name = "Name too long";
  } else {
    delete errors.name;
  }

  if(life && Number(life) <= maxStat) {
    delete errors.life
  } else {
    errors.life = "Stat must be lower than 200"
  }

  if (!life) {
    errors.life = "No life provided"
  } else if (!onlyNumbers.test(life)) {
    errors.life = "Only numbers provided"
  } else {
    delete errors.life;
  }

  if(attack && Number(attack) <= maxStat) {
    delete errors.attack
  } else {
    errors.attack = "Stat must be lower than 200"
  }

  if (!attack) {
    errors.attack = "No attack provided";
  } else if (!onlyNumbers.test(attack)) {
    errors.attack = "Only numbers allowed";
  } else {
    delete errors.attack;
  }

  if(defense && Number(defense) <= maxStat) {
    delete errors.defense
  } else {
    errors.defense = "Stat must be lower than 200"
  }

  if (!defense) {
    errors.defense = "No defense provided"
  } else if (!onlyNumbers.test(defense)) {
    errors.defense = "Only numbers allowed"
  } else {
    delete errors.defense
  }
 
  if(speed && Number(speed) <= maxStat) {
    delete errors.speed
  } else {
    errors.speed = "Stat must be lower than 200"
  }

  if (!speed) {
    errors.speed = "No speed provided"
  } else if (!onlyNumbers.test(speed)) {
    errors.speed = "Only numbers allowed"
  } else {
    delete errors.speed
  }

  
  if(height && Number(height) <= 1982) {
    delete errors.height
  } else {
    errors.height = "Stat must be lower than 1982cm (Eternatus)"
  }

  if (!height) {
    errors.height = "No height provided"
  } else if (!onlyNumbers.test(height)) {
    errors.height = "Only numbers allowed"
  } else {
    delete errors.height
  }

  if(weight && Number(weight) <= 1591) {
    delete errors.weight
  } else {
    errors.weight = "Stat must be lower than 1591kg (MissingNo.)"
  }

  if (!weight) {
    errors.weight = "No weight provided"
  } else if (!onlyNumbers.test(weight)) {
    errors.weight = "Only numbers allowed"
  } else {
    delete errors.weight
  }

    if (image && imageUrl.test(image)) {
      delete errors.image;
    } else {
      errors.image = "Only valid image URL"
  }

    if(!image) {
      delete errors.image;
    }

  if(types && types.length < 3) {
    errors.types = "Pokemons can't have more than 3 types"
  } else {
    delete errors.types;
  }

  if (!types) {
    errors.types = "Please choose types"
  } else {
    delete errors.types
  }
    
    return errors;
  };