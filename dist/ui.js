"use strict";var _interopRequireWildcard=require("@babel/runtime/helpers/interopRequireWildcard"),_interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault");require("core-js/modules/es.array.flat-map"),require("core-js/modules/es.array.includes"),require("core-js/modules/es.array.iterator"),require("core-js/modules/es.array.sort"),require("core-js/modules/es.array.unscopables.flat-map"),Object.defineProperty(exports,"__esModule",{value:!0}),exports.populateQueue=populateQueue,exports.default=exports.TaskList=exports.TaskListTitle=exports.Tasks=exports.Task=exports.WarningAndErrorsHeader=exports.Status=exports.OfflineWarning=exports.Warning=exports.Debug=exports.CommandError=void 0;var _objectSpread2=_interopRequireDefault(require("@babel/runtime/helpers/objectSpread")),_asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator")),_react=_interopRequireWildcard(require("react")),_propTypes=_interopRequireDefault(require("prop-types")),_camelCase=_interopRequireDefault(require("lodash/camelCase")),_isFunction=_interopRequireDefault(require("lodash/isFunction")),_isString=_interopRequireDefault(require("lodash/isString")),_isUndefined=_interopRequireDefault(require("lodash/isUndefined")),_negate=_interopRequireDefault(require("lodash/negate")),_chalk=require("chalk"),_pQueue=_interopRequireDefault(require("p-queue")),_pino=_interopRequireDefault(require("pino")),_isOnline=_interopRequireDefault(require("is-online")),_ink=require("ink"),_inkBox=_interopRequireDefault(require("ink-box")),_inkSpinner=_interopRequireDefault(require("ink-spinner")),_inkSelectInput=_interopRequireDefault(require("ink-select-input")),_figures=_interopRequireDefault(require("figures")),_cardinal=require("cardinal"),_commands=_interopRequireDefault(require("./commands")),_utils=require("./utils"),_common=require("./utils/common");const{assign}=Object,space=" ",Check=({isSkipped:a})=>_react.default.createElement(_ink.Color,{bold:!0,green:!a,dim:a},_figures.default.tick,space),X=()=>_react.default.createElement(_ink.Color,{bold:!0,red:!0},_figures.default.cross,space),Pending=()=>_react.default.createElement(_ink.Color,{cyan:!0},_react.default.createElement(_inkSpinner.default,null),space),Item=({isSelected:a,label:b})=>_react.default.createElement(_ink.Color,{bold:a,cyan:a},b),Indicator=({isSelected:a})=>_react.default.createElement(_ink.Box,{marginRight:1},a?_react.default.createElement(_ink.Color,{bold:!0,cyan:!0},_figures.default.arrowRight):" "),CommandError=a=>{const b=(0,_pino.default)({prettyPrint:{levelFirst:!0}},_pino.default.destination("./tomo-errors.txt"));return(0,_react.useEffect)(()=>{b.error(a)},[]),_react.default.createElement(_ink.Box,{flexDirection:"column",marginTop:1,marginLeft:1},_react.default.createElement(_ink.Box,null,_react.default.createElement(X,null),_react.default.createElement(_ink.Text,null,"Something has gone horribly ",_react.default.createElement(_ink.Color,{bold:!0,red:!0},"wrong"))),_react.default.createElement(_ink.Box,{marginLeft:2},"\u21B3",space,_react.default.createElement(_ink.Color,{dim:!0},"Details written to ./tomo-errors.txt")))};exports.CommandError=CommandError;const Debug=({data:a,title:b})=>{const{completed:c,errors:d,skipped:e,terms:f,options:g}=a,h=Object.keys(g).filter(a=>!(0,_isString.default)(g[a])).map(a=>`${a} - ${g[a]}`).sort(),i=a=>{var b,c;return b=(c=a,(0,_common.format)(c)),(0,_cardinal.highlight)(b)},j=({title:b="value",value:a})=>_react.default.createElement(_ink.Box,null,_react.default.createElement(_react.Fragment,null,_react.default.createElement(_ink.Color,{dim:!0},b),": ",i(a)));return j.propTypes={value:_propTypes.default.any},_react.default.createElement(_ink.Box,{flexDirection:"column",marginTop:1,marginLeft:1},_react.default.createElement(_ink.Box,{marginBottom:1},_react.default.createElement(_ink.Color,{bold:!0,cyan:!0},"DEBUG: "),_react.default.createElement(_ink.Color,{bold:!0,dim:!0},b)),_react.default.createElement(j,{title:"Terms",value:f}),_react.default.createElement(j,{title:"Options",value:h}),_react.default.createElement(j,{title:"Completed",value:c}),_react.default.createElement(j,{title:"Skipped",value:e}),_react.default.createElement(j,{title:"Errors",value:d}))};exports.Debug=Debug;const Description=({command:a})=>{return _react.default.createElement(_ink.Box,{marginBottom:1},_react.default.createElement(_ink.Color,{cyan:!0},(a=>{const b=`${(0,_chalk.dim)("Sorry, I don't have anything to say about")} ${a}`,c=(0,_common.dict)({project:`Scaffold a new Node.js project with ${_chalk.bold.yellow("Babel")}, ${(0,_chalk.bold)("ESLint")}, and ${_chalk.bold.magenta("Jest")}`,app:`Scaffold a new ${_chalk.bold.red("Marionette.js")} ${(0,_chalk.bold)("web application")} - basically a project with CSS, bundling, and stuff`,server:`Scaffold Node.js WebSocket, GraphQL, and HTTP(S) servers with an 80% solution for security "baked in"`,a11y:`Add automated ${(0,_chalk.bold)("accessibility")} testing`,babel:`Use next generation JavaScript, ${(0,_chalk.bold)("today!")}`,browsersync:`Time-saving ${(0,_chalk.bold)("synchronised browser")} testing (demo your app with ${_chalk.bold.yellow("live-reload")})`,electron:`Create a ${(0,_chalk.bold)("native desktop application")} using web technologies`,esdoc:`Generate ${(0,_chalk.bold)("documentation")} from your comments`,eslint:`Pluggable ${(0,_chalk.bold)("linting")} utility for JavaScript and JSX`,jest:`Delightful JavaScript ${(0,_chalk.bold)("Testing")} Framework with a focus on simplicity`,makefile:`Create a ${(0,_chalk.bold)("Makefile")} from your package.json, like ${_chalk.bold.magenta("magic!")}`,marionette:`${(0,_chalk.bold)("Flexible Backbone framework")} with robust views and architecture solutions`,parcel:`${(0,_chalk.bold)("Bundle")} your assets (${_chalk.bold.red("blazing")} fast with ${_chalk.bold.white("zero configuration")})`,postcss:`Use ${(0,_chalk.bold)("future CSS")}, never write vendor prefixes again, and much much more!`,react:`Build user interfaces with ${(0,_chalk.bold)("components")} ${_figures.default.arrowRight} learn once, write ${(0,_chalk.bold)("anywhere")}`,reason:`Write functional ${(0,_chalk.bold)("type safe")} code with ${_chalk.bold.yellow("JavaScript")}-like syntax (works with ${(0,_chalk.bold)("React")})`,rollup:`${(0,_chalk.bold)("Bundle")} your assets (focused on ${(0,_chalk.bold)("ES6")} modules and tree shaking - ${_chalk.bold.white("best for libraries")})`,webpack:`${(0,_chalk.bold)("Bundle")} your assets (with great support and a rich ecosystem)`});return c.has(a)?c.get(a):b})(a)))},ErrorMessage=({info:a})=>_react.default.createElement(_ink.Box,{flexDirection:"column",marginBottom:1},_react.default.createElement(_inkBox.default,{borderColor:"yellow",margin:{left:1,top:1},padding:{left:1,right:1}},_react.default.createElement(_ink.Color,{yellow:!0},"(\u256F\xB0\u25A1 \xB0)\u256F \u253B\u2501\u253B arrrgh...")),_react.default.createElement(_ink.Box,{marginLeft:4},"\u21B3",space,_react.default.createElement(_ink.Color,{dim:!0},"Something went wrong...")),_react.default.createElement(_ink.Box,{marginLeft:6,marginTop:1},_react.default.createElement(_ink.Color,{dim:!0},_react.default.createElement(_ink.Box,null,a))));class ErrorBoundary extends _react.Component{constructor(a){super(a),this.state={info:"",error:{},hasError:!1}}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(a,b){this.setState({error:a,info:b})}render(){const{error:a,hasError:b}=this.state,{children:c}=this.props;return b?_react.default.createElement(ErrorMessage,{error:a}):c}}const SubCommandSelect=({command:a,items:b,onSelect:c})=>{const[d,e]=(0,_react.useState)(b[0].value),f=`${_chalk.bold.yellow("CAUTION:")} tomo shall ${_chalk.bold.red("remove")} that which tomo would have ${_chalk.bold.green("added")}`;return _react.default.createElement(_ink.Box,{flexDirection:"column",paddingTop:1,paddingBottom:1,paddingLeft:1},"remove"===a?_react.default.createElement(_ink.Box,{marginBottom:1},f):_react.default.createElement(Description,{command:d}),_react.default.createElement(_inkSelectInput.default,{items:b,onSelect:c,onHighlight:a=>{e(a.value)},itemComponent:Item,indicatorComponent:Indicator}))},UnderConstruction=()=>_react.default.createElement(_ink.Box,{marginBottom:1},_react.default.createElement(_inkBox.default,{padding:{left:1,right:1},margin:{left:1,top:1}},_react.default.createElement(_ink.Color,{bold:!0,yellow:!0},"UNDER CONSTRUCTION"))),Warning=({callback:a,children:b})=>{const{setRawMode:c,stdin:d}=(0,_react.useContext)(_ink.StdinContext);return(0,_react.useEffect)(()=>(c&&c(!0),d.on("data",a),function(){d.removeListener("data",a),c&&c(!1)})),_react.default.createElement(_ink.Box,{flexDirection:"column",marginBottom:1},_react.default.createElement(_inkBox.default,{borderColor:"yellow",margin:{left:1,top:1},padding:{left:1,right:1}},_react.default.createElement(_ink.Color,{yellow:!0},"oops...")),_react.default.createElement(_ink.Box,{marginLeft:4},"\u21B3",space,b),_react.default.createElement(_ink.Box,{marginLeft:6,marginTop:1},_react.default.createElement(_ink.Color,{dim:!0},"Press "),_react.default.createElement(_ink.Text,{bold:!0},"ENTER"),_react.default.createElement(_ink.Color,{dim:!0}," to continue")))};exports.Warning=Warning;const OfflineWarning=()=>_react.default.createElement(_ink.Box,{flexDirection:"column",marginBottom:1},_react.default.createElement(_inkBox.default,{borderColor:"yellow",margin:{left:1,top:1},padding:{left:1,right:1}},_react.default.createElement(_ink.Color,{yellow:!0},"(\u2312_\u2312;) This is awkward...")),_react.default.createElement(_ink.Box,{marginLeft:4,flexDirection:"column"},_react.default.createElement(_ink.Box,null,"\u21B3",space,_react.default.createElement(_ink.Text,null,"...you appear to be ",_react.default.createElement(_ink.Color,{bold:!0,red:!0},"offline"))),_react.default.createElement(_ink.Box,null,"\u21B3",space,_react.default.createElement(_ink.Text,null,"Please connect to the internet and ",_react.default.createElement(_ink.Color,{bold:!0,cyan:!0},"try again")))),_react.default.createElement(_ink.Box,{marginLeft:6,marginTop:1},_react.default.createElement(_ink.Color,{dim:!0},"No dependencies will be installed")));exports.OfflineWarning=OfflineWarning;const Status=({tasks:a,completed:b,skipped:c})=>{const d=b.length+c.length===a.length;return _react.default.createElement(_ink.Box,{flexDirection:"column"},_react.default.createElement(_ink.Box,{marginLeft:4,marginBottom:1},_react.default.createElement(_ink.Color,{dim:!0},"\u21B3",space),d?_react.default.createElement(_ink.Color,{bold:!0,green:!0},"All Done!"):_react.default.createElement(_react.Fragment,null,_react.default.createElement(_ink.Color,{dim:!0},"Finished "),_react.default.createElement(_ink.Color,{bold:!0,white:!0},b.length),_react.default.createElement(_ink.Color,{bold:!0,dim:!0}," of "),_react.default.createElement(_ink.Color,{bold:!0,white:!0},a.length-c.length),_react.default.createElement(_ink.Color,{dim:!0}," tasks")),_react.default.createElement(_ink.Color,{dim:!0}," ("),_react.default.createElement(_ink.Color,{bold:!0},b.length),_react.default.createElement(_ink.Color,{dim:!0}," completed, "),_react.default.createElement(_ink.Color,{bold:!0},c.length),_react.default.createElement(_ink.Color,{dim:!0}," skipped"),_react.default.createElement(_ink.Color,null,")")))};exports.Status=Status;const WarningAndErrorsHeader=({errors:a,hasError:b,isOnline:c,options:{skipInstall:d}})=>_react.default.createElement(_react.Fragment,null,!c&&!d&&_react.default.createElement(OfflineWarning,null),b&&_react.default.createElement(CommandError,{errors:a}));/**
 * Add async tasks to a queue, handle completion with actions dispatched via dispatch function
 * @param {Object} data Data to be used for populating queue
 * @param {Queue} [data.queue={}] p-queue instance
 * @param {Object[]} [data.tasks=[]] Array of task objects
 * @param {function} [data.dispatch=()=>{}] Function to dispatch task completion (complete, skip, error) actions
 * @param {Object} [data.options={}] Options object to pass to task function
 * @return {undefined} Returns nothing (side effects only)
 */exports.WarningAndErrorsHeader=WarningAndErrorsHeader;function populateQueue(){return _populateQueue.apply(this,arguments)}/**
 * Task component
 * @param {Object} props Function component props
 * @param {boolean} props.isComplete Control display of check (true) or loading (false)
 * @param {boolean} props.isErrored Control display of x (true)
 * @param {boolean} props.isSkipped Control color of check - green (false) or dim (true)
 * @param {string} props.text Task text
 * @example
 * <Task text={'This task is done before it starts'} isComplete={true}></Task>
 * @return {ReactComponent} Task component
 */function _populateQueue(){return _populateQueue=(0,_asyncToGenerator2.default)(function*(a={queue:{},tasks:[],dispatch:()=>{},options:{skipInstall:!1}}){const{queue:b,tasks:c,dispatch:d,options:e}=a,{skipInstall:f}=e,g=f||(yield(0,_isOnline.default)()),h=assign(c.filter((0,_negate.default)(_utils.isValidTask)).reduce((a,b)=>(0,_objectSpread2.default)({},a,b),e),{isNotOffline:g});d({type:"status",payload:{online:g}});for(const[e,f]of c.filter(_utils.isValidTask).filter(_utils.isUniqueTask).entries()){const{condition:a,task:c}=f;try{(yield a(h))?yield b.add(()=>c(h)).then(()=>d({type:"complete",payload:e})).catch(()=>d({type:"error",payload:{index:e,title:"Failed to add task to queue",location:"task",details:f.text}})):d({type:"skipped",payload:e})}catch(a){d({type:"error",payload:{error:a,index:e,title:"Failed to test task conditions",location:"condition",details:f.text}})}}}),_populateQueue.apply(this,arguments)}const Task=({isComplete:a,isErrored:b,isPending:c,isSkipped:d,text:e})=>_react.default.createElement(_ink.Box,{flexDirection:"row",marginLeft:3},a&&_react.default.createElement(Check,{isSkipped:d}),b&&_react.default.createElement(X,null),c&&_react.default.createElement(Pending,null),_react.default.createElement(_ink.Text,null,_react.default.createElement(_ink.Color,{dim:a},e)));exports.Task=Task;const Tasks=({debug:a,options:b,state:c,tasks:d})=>_react.default.createElement(_ink.Box,{flexDirection:"column",marginBottom:1},d.filter(_utils.isValidTask).filter(_utils.isUniqueTask).map(({optional:d,text:e},f)=>{const{completed:g,errors:h,skipped:i}=c,j=(0,_camelCase.default)(e),k=i.includes(f),l=g.includes(f)||k,m=h.map(a=>a.payload.index).includes(f),n=[l,k,m].every(a=>!a),o=a&&_react.default.createElement(_ink.Color,{cyan:!0},f," - ",e),p=((a,b)=>(0,_isUndefined.default)(a)||(0,_isFunction.default)(a)&&a(b))(d,b),q=f<=Math.max(...g,...i)+1;return q&&p?_react.default.createElement(Task,{key:j,text:e,isSkipped:k,isComplete:l,isErrored:m,isPending:n}):_react.default.createElement(_ink.Box,{key:j},o)}));exports.Tasks=Tasks;const TaskListTitle=({command:a,hasError:b,isComplete:c,terms:d})=>_react.default.createElement(_inkBox.default,{margin:{left:1,top:1},padding:{left:1,right:1},borderColor:c?"green":b?"red":"cyan",borderStyle:"round"},_react.default.createElement(_ink.Color,{bold:!0,white:!0},a," ",d.join(" ")));/**
 * Task list component
 * @param {Object} props Function component props
 * @param {string} props.command Command - new | create | add
 * @param {Object} props.options Command line flags (see help)
 * @param {string[]} props.terms Terms - eslint | babel | jest | postcss | docs
 * @example
 * <TaskList command={'add'} terms={'eslint'} options={{skipInstall: true}}></TaskList>
 * @return {ReactComponent} Task list component
 */exports.TaskListTitle=TaskListTitle;const TaskList=({command:a,options:b,terms:c,done:d})=>{const[e,f]=(0,_react.useReducer)((a,{type:b,payload:c})=>{const{completed:d,errors:e,skipped:f}=a,g=b=>assign({},a,b),h=(0,_common.dict)({complete:()=>g({completed:[...d,c]}),skipped:()=>g({skipped:[...f,c]}),error:()=>g({errors:[...e,{payload:c}]}),status:()=>g({status:c})});return h.has(b)?h.get(b)():a},{completed:[],skipped:[],errors:[],status:{online:!0}}),{completed:g,errors:h,skipped:i,status:{online:j}}=e,{debug:k}=b,l=new _pQueue.default({concurrency:1}),m=c.flatMap(b=>_commands.default[a][b]).flatMap(a=>(0,_common.maybeApply)(a,b)).flatMap(a=>(0,_common.maybeApply)(a,b)),n=assign(m.filter((0,_negate.default)(_utils.isValidTask)).reduce((a,b)=>(0,_objectSpread2.default)({},a,b),b),{isNotOffline:j}),o=m.filter(_utils.isValidTask).filter(_utils.isUniqueTask),p=g.length+i.length===o.length,q=0<h.length;return(0,_react.useEffect)(()=>{populateQueue({queue:l,tasks:m,dispatch:f,options:n})},[]),p&&(0,_common.maybeApply)(d),_react.default.createElement(ErrorBoundary,null,k&&_react.default.createElement(Debug,{data:{tasks:m,terms:c,errors:h,skipped:i,completed:g,options:n},title:"Tasklist data"}),_react.default.createElement(WarningAndErrorsHeader,{errors:h,hasError:q,isOnline:j,options:n}),_react.default.createElement(_ink.Box,{flexDirection:"column",marginBottom:1},_react.default.createElement(TaskListTitle,{command:a,hasError:q,isComplete:p,terms:c}),_react.default.createElement(Status,{completed:g,skipped:i,tasks:o}),_react.default.createElement(Tasks,{debug:k,options:n,state:e,tasks:m})))};/**
 * Main tomo UI component
 * @param {Object} props Component props
 * @return {ReactComponent} Main tomo UI component
 */exports.TaskList=TaskList;class UI extends _react.Component{constructor(a){super(a);const{flags:b,input:c}=a,{ignoreWarnings:d}=b,[e,...f]=c,g=(0,_isString.default)(e),h=0<f.length,{intendedCommand:i,intendedTerms:j}=g?(0,_utils.getIntendedInput)(_commands.default,e,f):{},k=(e!==i||h&&j.map((a,b)=>a!==f[b]).some(Boolean))&&!d;this.state={hasTerms:h,hasCommand:g,showWarning:k,intendedTerms:j,intendedCommand:i},this.updateWarning=this.updateWarning.bind(this),this.updateTerms=this.updateTerms.bind(this)}render(){const{done:a,flags:b}=this.props,{hasCommand:c,hasTerms:d,intendedCommand:e,intendedTerms:f,showWarning:g}=this.state;return _react.default.createElement(ErrorBoundary,null,g?_react.default.createElement(Warning,{callback:this.updateWarning},_react.default.createElement(_ink.Text,null,"Did you mean ",_react.default.createElement(_ink.Color,{bold:!0,green:!0},e," ",f.join(" ")),"?")):c&&d?_react.default.createElement(TaskList,{command:e,terms:f,options:b,done:a}):c?_react.default.createElement(SubCommandSelect,{command:e,items:Object.keys(_commands.default[e]).map(a=>({label:a,value:a})),onSelect:this.updateTerms}):_react.default.createElement(UnderConstruction,null))}/**
     * Callback function for warning component
     * @param {string} data Character data from stdin
     * @return {undefined} Returns nothing
     */updateWarning(a){"\r"==a+""?this.setState({showWarning:!1}):process.exit(0)}/**
     * @param {Object} args Function options
     * @param {string} args.value Intended term
     * @return {undefined} Returns nothing
     */updateTerms({value:a}){this.setState({hasTerms:!0,intendedTerms:[a]})}}Check.propTypes={isSkipped:_propTypes.default.bool},Check.defaultProps={isSkipped:!1},Debug.propTypes={data:_propTypes.default.any,title:_propTypes.default.string},Description.propTypes={command:_propTypes.default.string},SubCommandSelect.propTypes={command:_propTypes.default.string,items:_propTypes.default.arrayOf(_propTypes.default.object),onSelect:_propTypes.default.func},Indicator.propTypes={isSelected:_propTypes.default.bool},Indicator.defaultProps={isSelected:!1},Item.propTypes={isSelected:_propTypes.default.bool,label:_propTypes.default.string.isRequired},Item.defaultProps={isSelected:!1},ErrorMessage.propTypes={info:_propTypes.default.string},ErrorBoundary.propTypes={children:_propTypes.default.node},Status.propTypes={completed:_propTypes.default.array,skipped:_propTypes.default.array,tasks:_propTypes.default.arrayOf(_propTypes.default.object)},Task.propTypes={isComplete:_propTypes.default.bool,isErrored:_propTypes.default.bool,isSkipped:_propTypes.default.bool,isPending:_propTypes.default.bool,text:_propTypes.default.string},Task.defaultProps={isComplete:!1,isErrored:!1,isSkipped:!1,isPending:!1,text:"task description"},TaskList.propTypes={command:_propTypes.default.string,options:_propTypes.default.any,terms:_propTypes.default.arrayOf(_propTypes.default.string),done:_propTypes.default.func},TaskList.defaultProps={command:"",options:{skipInstall:!1},terms:[]},TaskListTitle.propTypes={command:_propTypes.default.string,hasError:_propTypes.default.bool,isComplete:_propTypes.default.bool,terms:_propTypes.default.arrayOf(_propTypes.default.string)},Tasks.propTypes={debug:_propTypes.default.bool,options:_propTypes.default.object,state:_propTypes.default.object,tasks:_propTypes.default.arrayOf(_propTypes.default.object)},Warning.propTypes={callback:_propTypes.default.func,children:_propTypes.default.node},WarningAndErrorsHeader.propTypes={errors:_propTypes.default.array,hasError:_propTypes.default.bool,isOnline:_propTypes.default.bool,options:_propTypes.default.object},UI.propTypes={input:_propTypes.default.array,flags:_propTypes.default.object,done:_propTypes.default.func,stdin:_propTypes.default.string},UI.defaultProps={input:[],flags:{}};var _default=UI;exports.default=_default;