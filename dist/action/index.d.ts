/// <reference types="node" />
import stream from 'stream';
import StaticCodeAnalyzer, { AnalyzerConstructorParameter } from '@moneyforward/sca-action-core';
export declare type Locale = 'US' | 'UK';
export declare function isLocale(locale: string | undefined): locale is Locale;
export default class Analyzer extends StaticCodeAnalyzer {
    constructor(...[locale, ignore]: AnalyzerConstructorParameter[]);
    protected prepare(): Promise<void>;
    protected createTransformStreams(): stream.Transform[];
}
