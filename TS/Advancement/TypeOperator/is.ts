interface Bird {
  fly(): void;
}

interface Wolf {
  hunt(): void;
}

function isFish(pet: Bird | Wolf): pet is Bird {
    return (pet as Bird).fly !== undefined
}