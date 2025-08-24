import skinovi from '../data/skinovi.json';
export const getSkin = (): string | null => {
    return localStorage.getItem("selectedSkin");
};

export const setSkin = (skin: number) => {
    localStorage.setItem("selectedSkin", skin.toString());
};

export const getSkinData = () => {
    const skin = getSkin();
    const skinId = skin ? parseInt(skin, 10) : 0;
    const skinData = JSON.parse(JSON.stringify(skinovi));
    return skinData.find((item: any) => item.id === skinId);
};
