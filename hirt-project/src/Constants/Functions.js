export let apLimpGrossa = [];
export let apLimpFina = [];
export let apConcluded = [];
export let apConcluded2 = [];
export let apLimpFina2 = [];
export let apLimpGrossa2 = [];

export const funcLimpeza = (limpeza_completa) => {
    if (limpeza_completa === 1) {
        apLimpGrossa2 = [...apLimpGrossa, limpeza_completa]
        apLimpGrossa = apLimpGrossa2
        return "Fina"
    } else if (limpeza_completa === 2) {
        apLimpFina2 = [...apLimpFina, limpeza_completa]
        apLimpFina = apLimpFina2
        return "Grossa"
    } else if (limpeza_completa === 3) {
        apConcluded2 = [...apConcluded, limpeza_completa]
        apConcluded = apConcluded2
        return "Entrega"
    } else {
        return "Pendente"
    }
};

