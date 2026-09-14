export interface ProseBlock {
    id: string;
    heading: string;
    paragraphs: string[];
    bullets?: string[];
}

export interface ProsePage {
    eyebrow: string;
    title: string;
    lede: string;
    updated?: string;
    blocks: ProseBlock[];
}
