import { StaticCodeAnalyzer, Transformers } from '@moneyforward/sca-action-core';
export declare type Locale = 'US' | 'UK';
export default class Analyzer extends StaticCodeAnalyzer {
    constructor(locale?: Locale, ignore?: string);
    prepare(): Promise<unknown>;
    createTransformStreams(): Transformers;
}
