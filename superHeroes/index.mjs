import { agregarSuperheroe, mostrarSuperheroes } from './utils.mjs';

// Definir las rutas de los archivos
const archivoOriginal = './superheroes.txt';
const archivoNuevos = './agregarSuperheroes.txt';

// Agregar nuevos superhéroes
agregarSuperheroe(archivoOriginal, archivoNuevos);

// Mostrar la lista de superhéroes ordenada
mostrarSuperheroes(archivoOriginal);

