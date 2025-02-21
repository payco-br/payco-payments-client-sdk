/// <reference path="../../src/@types/fiserv3ds.d.ts" />
import { Fiserv3dsGetAuthResponse } from "fiserv3ds";
export declare function getAuthMethod(cardNumber: string): Promise<Fiserv3dsGetAuthResponse>;
