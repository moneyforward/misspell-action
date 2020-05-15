/// <reference types="node" />
import stream from 'stream';
import StaticCodeAnalyzer from '@moneyforward/sca-action-core';
export declare type Locale = 'US' | 'UK';
export default class Analyzer extends StaticCodeAnalyzer {
    constructor(locale?: Locale, ignore?: string);
    protected prepare(): Promise<void>;
    protected createTransformStreams(): stream.Transform[];
}
