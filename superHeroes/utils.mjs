import fs from 'fs';

// Clase para representar un Superhéroe
class Superheroe {
    constructor(id, nombreSuperheroe, nombreReal, nombreSociedad, planetaOrigen, debilidad, poder, habilidadEspecial, aliado, enemigo) {
        this.id = id;
        this.nombreSuperheroe = nombreSuperheroe;
        this.nombreReal = nombreReal;
        this.nombreSociedad = nombreSociedad;
        this.planetaOrigen = planetaOrigen;
        this.debilidad = debilidad;
        this.poder = poder;
        this.habilidadEspecial = habilidadEspecial;
        this.aliado = aliado;
        this.enemigo = enemigo;
    }
}

// Función para leer y ordenar los Superhéroes
export function leerSuperheroes(ruta) {
    try {
        if (!fs.existsSync(ruta)) {
            throw new Error(`El archivo ${ruta} no existe.`);
        }

        const datos = fs.readFileSync(ruta, 'utf-8');
        const superheroesArray = JSON.parse(datos);

        // Verificación de datos válidos
        if (!Array.isArray(superheroesArray)) {
            throw new Error('El archivo no contiene una lista válida de superhéroes.');
        }

        // Convertir a instancias de Superheroe
        const superheroes = superheroesArray.map(hero => new Superheroe(
            hero.id, 
            hero.nombreSuperheroe, 
            hero.nombreReal, 
            hero.nombreSociedad, 
            hero.planetaOrigen, 
            hero.debilidad, 
            hero.poder, 
            hero.habilidadEspecial, 
            hero.aliado, 
            hero.enemigo
        ));

        // Ordenar por el ID de los Superhéroes
        superheroes.sort((a, b) => a.id - b.id);

        return superheroes;
    } catch (error) {
        console.error(`Error al leer los superhéroes: ${error.message}`);
        return [];
    }
}

// Función para agregar superhéroes
export function agregarSuperheroe(rutaOriginal, rutaNuevos) {
    try {
        if (!fs.existsSync(rutaOriginal)) {
            throw new Error(`El archivo ${rutaOriginal} no existe.`);
        }
        if (!fs.existsSync(rutaNuevos)) {
            throw new Error(`El archivo ${rutaNuevos} no existe.`);
        }

        const datosOriginales = fs.readFileSync(rutaOriginal, 'utf-8');
        const datosNuevos = fs.readFileSync(rutaNuevos, 'utf-8');

        const superheroesOriginales = JSON.parse(datosOriginales);
        const superheroesNuevos = JSON.parse(datosNuevos);

        // Verificación de que ambas listas son válidas
        if (!Array.isArray(superheroesOriginales) || !Array.isArray(superheroesNuevos)) {
            throw new Error('Uno de los archivos no contiene una lista válida de superhéroes.');
        }

        // Combinar las listas de superhéroes originales y nuevos, eliminando duplicados por id
        const listaCompleta = [...superheroesOriginales, ...superheroesNuevos]
            .filter((hero, index, self) => 
                index === self.findIndex((h) => h.id === hero.id)
            );

        // Ordenar la lista completa por ID para mantener el orden
        listaCompleta.sort((a, b) => a.id - b.id);

        // Guardar la lista actualizada
        fs.writeFileSync(rutaOriginal, JSON.stringify(listaCompleta, null, 2), 'utf-8');
        console.log('Lista de superhéroes actualizada con éxito.');
    } catch (error) {
        console.error(`Error al agregar superhéroes: ${error.message}`);
    }
}

// Función para mostrar superhéroes ordenados
export function mostrarSuperheroes(ruta) {
    try {
        const superheroes = leerSuperheroes(ruta);
        if (superheroes.length === 0) {
            console.log('No se encontraron superhéroes para mostrar.');
            return;
        }

        console.log('Superhéroes ordenados:');
        superheroes.forEach(hero => console.log(hero));
    } catch (error) {
        console.error(`Error al mostrar superhéroes: ${error.message}`);
    }
}
