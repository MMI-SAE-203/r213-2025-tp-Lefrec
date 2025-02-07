import PocketBase from 'pocketbase';
const pb = new PocketBase('http://127.0.0.1:8090');


//dev web
export async function getOffre(id) {
    try {
        let data = await pb.collection('maison').getOne(id);
        data.imageUrl = pb.files.getURL(data, data.image);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return null;
    }
}

//Question7
export async function allMaisons() {
    try {
        let data = await pb.collection('Maison').getFullList({ sort: '-created' });
        console.log(data === undefined);
        data = data.map((maison) => {
            maison.imgURL = pb.files.getURL(maison, maison.images);
            return maison;
        })
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}

//Question11
export async function OneID(id) {
    const records = await pb.collection('Maison').getFullList({ filter: `id = '${id}'` })
    return records;
}

//Question12
export async function allMaisonsFavori() {
    const records = await pb.collection('Maison').getFullList({ filter: 'favori=true' })
    return records;
}

//Question13
export async function allMaisonsSorted() {
    const records = await pb.collection('Maison').getFullList({ sort: 'prix' })
    return records;
}

//Question14
export async function bySurface(surfMin) {
    let records = await pb.collection('Maison').getFullList({ filter: `surface > '${surfMin}'` })
    records = records.map((maison) => {
        maison.imgURL = pb.files.getURL(maison, maison.images);
        return maison;
    })
    return records;
}

//Question15
export async function surfaceORprice(surfMin, p) {
    const records = await pb.collection('Maison').getFullList({ filter: `surface > '${surfMin}' || prix < '${p}'` })
    return records;
}

//Question16
export async function getAgent(id) {
    const records = await pb.collection('Agent').getFullList({ filter: `id = '${id}'` })
    return records
}