import CheddarVariable from '../core/env/var';
import CheddarClass from '../core/env/class';
import CheddarEval from '../core/eval/eval';
import NIL from '../core/consts/nil';

export default class CheddarAssign {
    constructor(tokl, scope) {
        this.assignt = tokl.tok(0); // assignment type
        this.assignl = tokl.tok(1); // name & type?
        this.toks = tokl;

        this.scope = scope;
    }

    exec() {
        if (this.scope.has(this.assignl.tok(0))) {
            // ERROR INTEGRATE
            return `${this.assignl.tok(0)} has already been defined`;
        }

        let val = new CheddarEval(this.toks.tok(2), this.scope);
        if (!((val = val.exec()) instanceof CheddarClass || val.prototype instanceof CheddarClass))
            return val;

        val.scope = this.scope;
        val.Reference = this.assignl.tok(0);

        let res = this.scope.manage(this.assignl.tok(0),
            new CheddarVariable(val, {
                Writeable: this.assignt !== "const",
                StrictType: this.assignl.tok(1) || null
            })
        );

        if (res !== true) {
            return `\`${this.assignl.tok(0)}\` is a reserved keyword`;
        }
    }
}