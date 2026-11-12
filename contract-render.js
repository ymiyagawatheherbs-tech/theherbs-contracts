/* THE HERBS 雇用契約書 描画（管理画面・署名ページ共通） */
(function(global){
'use strict';

// 元の契約書の文面（控え・変更前）
const ORIGINAL_TEXT = {
  preamble: { enabled:false, title:'', body:'' },
  overtime: [
    '会社は前日までに通知の上、上記の出勤日を振り返ることがある',
    '所定外労働：有り（会社は労使協定の範囲内で残業、休日出勤を命じることがある）',
    '時間外・休日労働を行う場合は、事前又は事後１週間以内に会社に届出を行い、その承認を得ること',
    '　（上記届出を怠った場合、会社は当該時間外手当支払いを拒否することがある）'
  ],
  leave: [
    '年次有給休暇：取得日の30日（連続3日以上の場合は2箇月）前までに所属長の承認を得ること',
    '有給休暇を使用する際は、会社の運営や他のスタッフの業務に支障が出ないよう配慮すること'
  ],
  wageNote: '退職日（最終出勤日）以降に支払われる賃金については、振込ではなく本人への現金手渡支給とする',
  retire: [
    '退職希望日の1月前に会社に退職の意を届出、退職の申出が認められた場合',
    '無断欠勤が引き続き１４日以上に渡った場合就労の意志がないものとみなし、退職手続を行う',
    '病気および私事都合による欠勤が年間３０日以上に及んだ場合',
    '死亡した場合'
  ],
  retireNote: '業務の引継ぎを完了させることを優先すること。期中の解約については、会社が被った実損に基づいた形で損害賠償を請求することがあります。',
  renewalLead: '非正規職員契約は下記の契約更新要件を全て満たしており、かつ更新後の労働条件について労使双方の意志が合致した場合に更新することがあるものとする。但し、業務の減少、経営の悪化等、業務の運営上やむを得ない事情のあるときは本契約の更新はおこなわない。',
  renewalReq: [
    '心身共に健康であり、通常の勤務に耐えることができる',
    '本契約期間内に勤務上の不就業（遅刻・早退・欠勤）が一定以上ない場合',
    '裏面に記載された服務心得を遵守し、勤務態度が良好である',
    '本契約期間内に就業規則または非正規職員規程に定める懲戒処分を受けていない'
  ],
  appearance: {
    lead: 'THE HERBSの一員であることを自覚し、勤務時間中は以下を身に着けないことを誓約します。',
    items: ['華美な指輪・ピアス・イアリングその他装飾品','華美なネイル（ストーン・グリッター含む）・シール','香水（香りの妨げとなるもの）','その他会社が運営上相応しくないと判断したもの'],
    tail: ['勤務時間中だけでなく通勤時においても、清潔感のある身だしなみに努め、過度に華美な服装・髪型・髪色は慎みます。','華美であるかの判断は、会社が行うものであり、私自身が判断するものではないことを誓約します。']
  },
  service: [
    '自己の業務上の権限を超えて専断的なことを行なわないこと',
    '頭髪及び服装または言動等常に品位を保ち、会社ならびに会社内の個人の名誉を害し信用を傷つけるようなことをしないこと',
    '会社の車両、機器、器具その他の備品を大切にし、消耗品の節約に努め、書類は丁寧に取り扱い、その保管を厳にするとともに、故障破損を起こしまたは紛失したときは、直ちにその事実を会社に届けること',
    '許可なく職務以外の目的で会社の設備、車両、機械、器具その他の物品を使用したり、持ち出したりしないこと',
    '職務に関し、不当な金品の借用または贈与の利益を受けないこと',
    '始業時刻までに出勤し、始業と同時に就業できるように準備をしておくこと',
    '勤務時間中みだりに職場を離れないこと',
    '酒気をおびて勤務しないこと',
    '直行、直帰等をする場合は、事前に会社の承認を受けること',
    '勤務時間中定められた自己の業務以外の仕事をしないこと。また、私物を作成しないこと',
    '職場の整理整頓に努め、常に清潔に保つようにすること',
    '業務について偽りの申告、または業務上の誤りを隠し、業務の運営に支障をきたさないこと',
    '業務を妨害し、または職場の風紀秩序を乱さないこと',
    'むやみに身体に接触したりするなど職場及び得意先での性的な言動によって他人に不快な思いをさせないこと',
    '相手方の望まない性的言動により、他の職員に不利益を与えたり、就業環境を害すると判断される行為をしないこと',
    '私事に関する金銭取引、その他の証書、書類に会社の名称を用いないこと',
    '事業場内において許可なく業務に関係の無い集会、演説、印刷物の配布、掲示その他これに類する行為をしないこと',
    '会社構内または会社施設内において、会社の許可なく政治活動、宗教活動、組合活動、その他勧誘行為をしないこと',
    '反社会的な勢力・団体との接触等により会社の信用に傷をつけないこと',
    '許可された場所以外で喫煙し、または焚火、電熱器等の火気を許可なく使用しないこと',
    '会社内で賭博その他これに類する行為をしないこと',
    '勤務終了後または勤務開始前に正当な理由なく会社内にとどまらないこと',
    'インターネット上のホームページ等を、業務以外の目的で閲覧及び使用しないこと。また、Eメールの私的使用をしないこと',
    '会社に付随する一切の情報、誹謗中傷等をインターネット掲示板、ブログ等の公共性の高い媒体に掲載及び投稿をしないこと',
    '在職中または退職後においても会社の業務上の機密、会社の不利益となる事項または取引先等の機密を他に漏らさないこと',
    '顧客及びその家族の個人情報を決して漏洩しないこと、外部に持ち出さないこと',
    'その他前各号に準ずるような従業員としてふさわしくない行為をしないこと'
  ],
  commute: '通勤手当は実際に発生した費用（上限あり）に対する手当のため、費用が発生しない場合については支給しない。ただし従業員が費用の発生を証明した場合はその限りではない。',
  pledge: [
    '私は、会社の就業規則その他の諸規程、通達等を守り、業務命令に従い、誠実に勤務します。',
    '私は、配置転換、出向、転勤等については会社の指示に従います。',
    '私は、常に品位を保ち、会社の名誉、信用を汚さぬことを誓います。',
    '私は、故意又は過失により、会社に与えた損害につき、全部又は一部の賠償の責を負います。',
    '私は、業務上の機密及び会社の不利益となる事項については、在職中は勿論、退職後も他に漏らしません。',
    '私は、採用後に副業等を行う場合は、必ず会社にその内容を報告し、会社の許可を得てから行います。',
    '私が先に提出した履歴書等の記載事項は、事実と相違ありません。',
    '私は、会社業務に関連するすべての書類、書簡、ノート、メモ、その他これに類する資料およびその写しをすべて会社の所有物として所持するものとし、会社の要求のあり次第、何時でも会社の閲覧、複写に供し、またその返還に応じます。',
    '貴社から貸与を受けたパソコン、携帯電話、携帯端末（以下「パソコン等」という。）については、貴社の業務遂行のためにのみ使用し、私自身のために使用しないことはもちろん、貴社以外の第三者のために使用することはいたしません。',
    '私は、貴社から貸与を受けたパソコン等に蓄積された情報に関する所有権その他の一切の権利が貴社に帰属するものであることを確認し、貴社が、必要に応じそのパソコン内に記録されている全ての情報（ログデータを含む）を閲覧、プリントアウトまたは記録媒体等へコピーすることを承諾し、貴社が行うそれらの行為を妨害することはいたしません。',
    '私は、貴社から貸与を受けたパソコン等につき、貴社から、調査、点検、保守、修理、配備換え、リース会社への返還、廃棄等のため、貴社に返却することを求められた場合には、速やかにこれに応じます。',
    '私は、貴社就業規則および秘密管理規程に従い、業務上の機密は、在職中は勿論退職後といえども一切漏洩いたしません。'
  ]
};

// 修正案（前文の追加・時間外・損害賠償・入社誓約4）
const PROPOSED_TEXT = JSON.parse(JSON.stringify(ORIGINAL_TEXT));
PROPOSED_TEXT.preamble = {
  enabled: true,
  title: '契約にあたって ― THE HERBSの考え方',
  body: [
    'THE HERBSは「引き算美容」を大切にしている会社です。美容とは、たくさんのものを足すことではなく、その人に本当に必要なものを選ぶこと。植物の力を生かしたシンプルなケアで、お客様が健やかな肌と頭皮を保てるようお手伝いすることが、私たちの仕事です。',
    'この考え方は、ともに働く人との関係にも通じます。私たちは、一人ひとりの暮らしや希望に合った働き方を話し合って決め、その約束をこの契約書にはっきりと書き残します。',
    '#約束を明確にします',
    '契約の内容は更新のたびに書面（電子を含む）で取り交わし、条件を変えるときは事前に説明します。',
    '#努力と成長に報います',
    '昇給は契約更新時に、勤怠の記録と面談での評価にもとづいて決めます。正社員は昇給と賞与で、パートタイム・アルバイトは昇給と社内の制度で、日々の貢献に報います。',
    '#相談できる職場をつくります',
    '働き方や条件について困ったことがあれば、いつでも相談窓口に申し出てください。相談したことで不利益に扱うことはありません。',
    '#誠実な仕事をお願いします',
    'お客様と仲間に誠実に向き合い、会社のルールと服務心得を守ることを、ともに働く全員にお願いします。',
    'この契約書は、会社とあなたとの大切な約束です。内容をよく読み、わからないことがあれば署名の前に遠慮なく質問してください。'
  ].join('\n')
};
PROPOSED_TEXT.overtime = [
  '会社は前日までに通知の上、上記の出勤日を振り返ることがある',
  '所定外労働：有り（会社は労使協定の範囲内で残業、休日出勤を命じることがある）',
  '時間外・休日労働は、原則として事前に所属長の指示または承認を受けて行うこと。やむを得ず事前に承認を受けられなかった場合は、事後１週間以内に会社に届け出ること',
  '　（承認のない時間外労働は認めない。ただし、実際に業務に従事した時間については、法令に基づき賃金を支払う）'
];
PROPOSED_TEXT.retireNote = '業務の引継ぎを完了させることを優先すること。なお、故意または重大な過失により会社に損害を与えた場合は、実際に生じた損害の範囲で賠償を求めることがある。';
PROPOSED_TEXT.pledge[3] = '私は、故意又は重大な過失により会社に損害を与えた場合は、実際に生じた損害の範囲で賠償の責を負います。';

// ===== ユーティリティ =====
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const yen = n => (n == null || n === '' || isNaN(n)) ? '' : Number(n).toLocaleString('ja-JP');
const ck = on => on ? '☑' : '☐';
function parseD(s){ if(!s) return null; const [y,m,d]=String(s).slice(0,10).split('-').map(Number); return new Date(y,m-1,d); }
function wareki(s){ if(!s) return {y:'',m:'',d:''}; const d=parseD(s); return {y:d.getFullYear()-2018, m:d.getMonth()+1, d:d.getDate()}; }
function jstDate(ts){ const d=new Date(ts); const j=new Date(d.getTime()+9*3600000); return `${j.getUTCFullYear()}-${String(j.getUTCMonth()+1).padStart(2,'0')}-${String(j.getUTCDate()).padStart(2,'0')}`; }
function jstDateTime(ts){ const d=new Date(new Date(ts).getTime()+9*3600000); const p=n=>String(n).padStart(2,'0'); return `${d.getUTCFullYear()}/${p(d.getUTCMonth()+1)}/${p(d.getUTCDate())} ${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())}`; }
function mergeText(t){ const base=JSON.parse(JSON.stringify(PROPOSED_TEXT)); if(!t) return base; for(const k of Object.keys(base)){ if(t[k]!==undefined && t[k]!==null) base[k]=t[k]; } return base; }

// 送付時に固定する内容
function buildSnapshot({contract, employee, company, text, mkYears, firstStart}){
  const c = JSON.parse(JSON.stringify(contract));
  ['created_at','updated_at','file_path','note'].forEach(k=>delete c[k]);
  const mk = mkYears || 5;
  let mkInPeriod=false;
  if(c.is_fixed_term && firstStart && c.end_date){
    const d=parseD(firstStart); d.setMonth(d.getMonth()+mk*12);
    const reach=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    mkInPeriod = reach <= c.end_date;
  }
  const t = mergeText(text); delete t.approved; delete t.approved_at;
  return { version:1, contract:c, employee:{ name:employee.name, code:employee.code, manager_name:employee.manager_name||null },
    company:{ name:company.name, address:company.address, representative:company.representative, contact_dept:company.contact_dept,
      contact_name:company.contact_name, contact_tel:company.contact_tel, closing_day:company.closing_day, pay_day:company.pay_day,
      locations:company.locations||[], departments:company.departments||[] },
    text:t, mk:{ years:mk, inPeriod:mkInPeriod }, issued_at:new Date().toISOString() };
}

// signed: {name, address, signature, signed_at} / audit: {email, created_at, opened_at, hash, ip, ua, agreements}
function render(snap, opts={}){
  const c=snap.contract, co=snap.company||{}, T=mergeText(snap.text), e=snap.employee||{};
  const signed=opts.signed||null;
  const ws=wareki(c.start_date), we=wareki(c.end_date);
  const fixed=c.is_fixed_term, isRegular=c.employment_type==='正社員';
  const title= isRegular ? '雇用契約書（正社員用）' : '雇用契約書（非正規社員用）';
  const locs=[...new Set([...(co.locations||[]), ...(c.work_locations||[])])];
  const deps=[...new Set([...(co.departments||[]), ...(c.departments||[])])];
  const shifts=[...(c.shifts||[])]; { let n=1; while(shifts.length<4){ while(shifts.some(s=>s.label===`勤務${n}`)) n++; shifts.push({label:`勤務${n}`}); n++; } }
  const brk=(c.shifts||[]).map(s=>s.break_min).filter(v=>v!=null);
  const brkText= brk.length && brk.every(v=>v===brk[0]) ? `${brk[0]}分` : '';
  const hrsText= c.hours_per_day ? `${c.hours_per_day}時間` : '';
  const wdays=(c.work_weekdays||[]);
  const workDayText= wdays.length ? `勤務日：${wdays.join('・')}曜日` : c.shift_based ? '勤務日：シフトにより定める' : '';
  const holidayText= c.holiday_text || (wdays.length ? '上記の勤務日以外の日、および会社カレンダーで定める休日（年末年始など）' : c.shift_based ? 'シフトで定める勤務日以外の日' : '会社カレンダーで定める休日');
  const mk=snap.mk||{years:5,inPeriod:false};
  const mkText= fixed && mk.inPeriod ? `本契約期間中に通算契約期間が${mk.years}年を超えるため、本契約期間の初日から末日までの間、無期労働契約への転換を申し込むことができる。` : '';
  const sd = signed ? wareki(jstDate(signed.signed_at)) : null;
  const dateTxt = sd ? `令和 ${sd.y}年 ${sd.m}月 ${sd.d}日` : '令和　　年　　月　　日';
  const who = signed ? `<span class="esig">電子署名：${esc(signed.name)}</span>` : '（　　　　　　　　　　　㊞）';
  // 電子署名の画面（署名前）では、各所の押印欄の代わりに「最後にまとめて署名」と案内する
  const esignNote = opts.esign && !signed;
  const sign = esignNote ? `<div class="sign esign-note">署名は、いちばん下の「同意と署名」でまとめて行います</div>`
    : `<div class="sign">上記内容に合意します　　${dateTxt}　${who}</div>`;
  const insSign = esignNote ? `<div class="sign esign-note">署名は、いちばん下の「同意と署名」でまとめて行います</div>` : `<div class="sign">${dateTxt}　${who}</div>`;
  const wageKinds=['日給月給','日給','時給','月給'];
  const P=T.preamble||{};
  const preamble = P.enabled && P.body ? `
  <div class="doc-page preamble">
    <h1 style="letter-spacing:.08em${P.subtitle?';margin-bottom:2mm':''}">${esc(P.title||'契約にあたって')}</h1>
    ${P.subtitle?`<div class="pre-sub">${esc(P.subtitle)}</div>`:''}
    <div class="pre-to">${esc(e.name)}　さんへ</div>
    ${String(P.body).split('\n').filter(s=>s.trim()).map(s=> s.startsWith('#') ? `<div class="pre-h">${esc(s.slice(1).trim())}</div>` : `<p>${esc(s)}</p>`).join('')}
    <div class="pre-from">${esc(co.name||'')}<br>${esc(co.representative||'')}</div>
  </div>` : '';
  const body = `
  <div class="doc-page">
    <h1>${title}</h1>
    <div class="head">
      <div class="to">${esc(e.name)}　殿</div>
      <div class="co">所在地　${esc(co.address||'')}<br>名　称　${esc(co.name||'')}<br>氏　名　${esc(co.representative||'')}${(signed||opts.esign)?'':' ㊞'}</div>
    </div>
    <table class="ct"><tbody>
      <tr><th>契約期間</th><td>${fixed? `☑ 定めあり　令和 ${ws.y}年 ${ws.m}月 ${ws.d}日　～　令和 ${we.y}年 ${we.m}月 ${we.d}日` : `☑ 定めなし　令和 ${ws.y}年 ${ws.m}月 ${ws.d}日 から`}</td></tr>
      <tr><th>就業の場所</th><td>${locs.map(x=>`${ck((c.work_locations||[]).includes(x))} ${esc(x)}`).join('　　')}　　${ck(!!c.work_location_other)} 他（${esc(c.work_location_other||'　　　　　　　　')}）<br>異動の範囲：居所を変更しない範囲で、就業場所の変更を命じることがあります</td></tr>
      <tr><th>仕事の内容</th><td>${deps.map(x=>`${ck((c.departments||[]).includes(x))} ${esc(x)}`).join('　')}<br>異動の範囲：就業規則による<br>＊　${esc(c.job_detail||'仕事については業種を特定せず、関連業務その他を手伝ってもらう場合があります')}</td></tr>
      <tr><th>始業終業の時刻、休憩時間、所定時間外労働の有無</th><td>
        <div class="inner-wrap"><table class="inner"><colgroup><col style="width:17mm"><col style="width:13mm"><col style="width:13mm"><col style="width:11mm"><col style="width:17mm"><col></colgroup><tbody>
          <tr><th>スタッフ</th><th>始業</th><th>終業</th><th>休憩</th><th>労働時間</th><th>休日等</th></tr>
          ${shifts.map((s,i)=>`<tr><td style="text-align:left">${ck(!!(s.in||s.out))} ${esc(s.label||`勤務${i+1}`)}</td><td>${esc(s.in||'　：　')}</td><td>${esc(s.out||'　：　')}</td>${i===0?`<td rowspan="4">${esc(brkText||'法定通り')}</td><td rowspan="4">${esc(hrsText)}</td><td rowspan="4" style="text-align:left">${workDayText?`${esc(workDayText)}<br>`:''}休日：${esc(holidayText)}<br>${ck(c.shift_based)} シフト制（週（${esc(c.days_per_week??'　')}）日程度勤務）<br>${ck(c.variable_hours)} １箇月単位の変形労働時間制対象</td>`:''}</tr>`).join('')}
        </tbody></table></div>
        <div class="shift-list">${(c.shifts||[]).filter(s=>s.in||s.out).map((s,i)=>`<div>☑ ${esc(s.label||`勤務${i+1}`)}　${esc(s.in||'')}〜${esc(s.out||'')}（休憩 ${esc(s.break_min!=null?s.break_min+'分':'法定通り')}）</div>`).join('')}
          <div>1日の所定労働時間：${esc(hrsText||'—')}</div>
          ${workDayText?`<div>${esc(workDayText)}</div>`:''}
          <div>休日：${esc(holidayText)}</div>
          <div>${ck(c.shift_based)} シフト制（週（${esc(c.days_per_week??'　')}）日程度勤務）</div>
          <div>${ck(c.variable_hours)} １箇月単位の変形労働時間制対象</div></div>
        ${(T.overtime||[]).map(s=> s.startsWith('　')? `${esc(s)}<br>` : `・${esc(s)}<br>`).join('')}
        ${sign}</td></tr>
      <tr><th>休暇</th><td>${(T.leave||[]).map(s=>`・${esc(s)}`).join('<br>')}</td></tr>
      <tr><th>賃金</th><td>1　賃金：${opts.mobile?'下記【賃金】に記載':'裏面に記載'}<br>2　締日支払日：賃金締日　毎月 ${esc(co.closing_day??10)}日　　賃金支払日　毎月 ${esc(co.pay_day??25)}日<br>　 ${esc(T.wageNote||'')}<br>3　昇給：${esc(c.raise_text||'')}<br>　 賞与：${esc(c.bonus_text||'')}　　退職金：${esc(c.retirement_allowance_text||'')}${sign}</td></tr>
      <tr><th>加入保険</th><td>${ck(c.workers_comp)} 労災保険　　${ck(c.employment_insurance)} 雇用保険　　${ck(c.social_insurance)} 社会保険（健康保険・厚生年金）<br>${isRegular?'':`${ck(!c.social_insurance)} 週30時間未満の勤務を希望し、社会保険には加入しません<br>${ck(c.social_insurance)} 週30時間以上の勤務を希望し、社会保険に加入します<br>`}${insSign}</td></tr>
      <tr><th>退職に関する事項${fixed?`<br>雇用契約更新の要件<br>（有期契約対象者）<br>${ck(c.renewal==='更新見込有り')} 更新見込有り<br>${ck(c.renewal==='更新見込無し')} 更新見込無し<br><br>更新上限回数<br>（ ${esc(c.renewal_cap||'　')} 回まで）<br>無期転換申込機会<br>${mk.inPeriod?'☑ 有り':'☐ 有り'}<br>無期転換後の労働条件<br>☑ 条件変更なし`:''}</th>
      <td class="tiny">【退職に関する事項】<br>${isRegular?'正社員の退職・解雇については就業規則の定めによる。<br>':`非正規職員の契約については、下記のいずれかに該当する場合は退職したものとする<br>
        ${(T.retire||[]).map((t,i)=>`${i+1}　${esc(t)}`+(i===0&&T.retireNote?`<br>＊ ${esc(T.retireNote)}`:'')).join('<br>')}
        ${fixed?`<br>${esc(T.renewalLead)}<br>【雇用契約更新の要件】<br>${(T.renewalReq||[]).map((t,i)=>`${i+1}　${esc(t)}`).join('<br>')}`:''}
        ${mkText?`<br>【無期転換申込機会】${esc(mkText)}`:''}`}</td></tr>
      <tr><th>その他</th><td>・教育訓練：${isRegular?'会社の定めるところにより実施する':'正社員と同様の業務については、同等の教育訓練を実施する'}<br>・相談窓口：働き方や労働条件${isRegular?'':'、正社員への転換'}などの相談は、まず所属の上長${e.manager_name?`（${esc(e.manager_name)}）`:''}にしてください。上長に相談しにくいときや解決しないときは、${co.contact_dept?esc(co.contact_dept)+' ':''}${esc(co.contact_name||'')}${co.contact_tel?`（電話 ${esc(co.contact_tel)}）`:''}が受け付けます。相談したことを理由に不利益な扱いをすることはありません。</td></tr>
    </tbody></table>
  </div>
  <div class="doc-page">
    <div class="sec">【アピアランスに関する誓約】</div>
    <div>${esc(T.appearance?.lead||'')}</div>
    <ol type="A" style="padding-left:8mm">${(T.appearance?.items||[]).map(t=>`<li>${esc(t)}</li>`).join('')}</ol>
    <div>${(T.appearance?.tail||[]).map(esc).join('<br>')}</div>
    ${sign}
    <div class="sec center" style="font-size:11pt">服務心得</div>
    <ol class="svc">${(T.service||[]).map(t=>`<li>${esc(t)}</li>`).join('')}</ol>
    <div class="sec">【賃　　金】</div>
    <div>${wageKinds.map(k=>`${ck(c.wage_type===k)} ${k}`).join('　　')}</div>
    <table class="wage"><tbody>
      <tr><td style="width:40mm">基本給</td><td style="text-align:right">${yen(c.base_wage)}円</td><td class="tiny">${c.wage_type==='時給'?'1時間あたり':c.wage_type==='日給'?'1日あたり':'月額'}</td></tr>
      ${(c.allowances||[]).map(a=>`<tr><td>${esc(a.name)}</td><td style="text-align:right">${a.amount!=null?yen(a.amount)+'円':''}</td><td class="tiny">${esc(a.memo||'')}</td></tr>`).join('')}
    </tbody></table>
    <div class="tiny">＊　${esc(T.commute||'')}</div>
    <div class="sec">【就業にあたっての誓約】</div>
    <ol class="svc">${(T.pledge||[]).map(t=>`<li>${esc(t)}</li>`).join('')}</ol>
    <div style="margin-top:3mm">以上貴社の雇用条件を認め、就労いたします。　　　　　${esignNote?'':dateTxt}</div>
    ${esignNote ? `<div class="sign esign-note" style="text-align:left">住所・氏名・署名は、いちばん下の「同意と署名」で入力します</div>` : signed ? `<div class="sigblock">
        <div>住　所　${esc(signed.address)}</div>
        <div>氏　名　${esc(signed.name)}</div>
        <div class="sigimg"><img src="${esc(signed.signature)}" alt="署名"></div>
      </div>`
      : `<div class="sigblock">住　所　＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿<br>氏　名　${esc(e.name)}　　　　　　　　　　　㊞</div>`}
  </div>`;
  const a=opts.audit;
  const audit = a ? `
  <div class="doc-page audit">
    <div class="sec">【電子署名の記録】</div>
    <table class="wage" style="width:100%"><tbody>
      <tr><td style="width:42mm">文書</td><td>${esc(title)}（${esc(e.name)}・第${esc(c.seq)}回）</td></tr>
      <tr><td>送付日時</td><td>${a.created_at?jstDateTime(a.created_at):''}${a.email?`（送付先 ${esc(a.email)}）`:''}</td></tr>
      <tr><td>初回閲覧日時</td><td>${a.opened_at?jstDateTime(a.opened_at):''}</td></tr>
      <tr><td>署名日時</td><td>${signed?jstDateTime(signed.signed_at):''}</td></tr>
      <tr><td>署名者</td><td>${signed?esc(signed.name):''}</td></tr>
      <tr><td>同意した項目</td><td>${(a.agreements_labels||[]).map(esc).join('<br>')}</td></tr>
      <tr><td>文書の指紋（SHA-256）</td><td style="word-break:break-all;font-family:monospace;font-size:7.5pt">${esc(a.hash||'')}</td></tr>
      <tr><td>署名端末</td><td style="font-size:7.5pt">${esc(a.ip||'')} ${esc(a.ua||'')}</td></tr>
    </tbody></table>
    <div class="tiny" style="margin-top:2mm">本書は電子的に交付・署名された雇用契約書です。送付時の内容は上記の指紋で固定されており、署名後に変更されていないことを確認できます。</div>
  </div>` : '';
  return `<div class="doc${opts.fixed?' fixed':''}">${preamble}${body}${audit}</div>`;
}

const AGREEMENTS = [
  {key:'terms', label:'雇用契約書（労働条件）の内容を確認し、同意します'},
  {key:'appearance', label:'アピアランスに関する誓約に同意します'},
  {key:'service', label:'服務心得を守ることに同意します'},
  {key:'pledge', label:'就業にあたっての誓約に同意します'},
  {key:'electronic', label:'この契約書を電子で受け取り、電子で署名することに同意します（紙での受け取りを希望する場合は署名せずに会社へ連絡してください）'}
];

const STYLE = `
.doc{font-family:"Hiragino Mincho ProN","Yu Mincho","Noto Serif JP","Noto Serif CJK JP",serif;color:#000;font-size:8.4pt;line-height:1.34}
.doc-page{width:186mm;margin:0 auto;background:#fff}
.doc h1{text-align:center;font-size:14pt;margin:0 0 2mm;letter-spacing:.2em;font-weight:600}
.doc .head{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:3mm;gap:4mm}
.doc .head .to{border-bottom:1px solid #000;min-width:70mm;font-size:11pt;padding-bottom:1mm}
.doc .head .co{font-size:9.5pt;line-height:1.6}
.doc table.ct{width:100%;border-collapse:collapse;table-layout:fixed}
.doc table.ct > tbody > tr > th,.doc table.ct > tbody > tr > td{border:1px solid #000;padding:.9mm 1.6mm;vertical-align:middle}
.doc table.ct > tbody > tr > th{width:31mm;font-weight:400;text-align:left}
.doc table.inner{width:100%;border-collapse:collapse;margin-bottom:1mm;table-layout:fixed}
.doc table.inner th,.doc table.inner td{border:1px solid #000;padding:.4mm 1.5mm;text-align:center;font-weight:400}
.doc .sign{margin-top:1mm;text-align:right;white-space:nowrap}
.doc .esig{display:inline-block;border-bottom:1px solid #000;padding:0 2mm;font-weight:600}
.doc ol,.doc ul{margin:0;padding-left:5mm}
.doc .sec{font-weight:600;margin:2mm 0 .6mm}
.doc .center{text-align:center}
.doc table.wage{border-collapse:collapse;width:120mm;margin:1mm 0}
.doc table.wage td{border:1px solid #000;padding:1mm 2mm}
.doc .tiny{font-size:7.8pt;line-height:1.3}
.doc ol.svc{padding-left:6mm;font-size:7.9pt;line-height:1.28}
.doc .sigblock{margin-top:3mm;margin-left:80mm;line-height:2.2}
.doc .sigimg img{height:16mm;max-width:80mm;display:block}
.doc .preamble{font-size:10pt;line-height:1.85}
.doc .preamble h1{margin:6mm 0 6mm;font-size:15pt}
.doc .preamble p{margin:0 0 3mm;text-indent:1em}
.doc .preamble .pre-sub{text-align:center;font-size:11pt;margin:0 0 7mm;letter-spacing:.04em}
.doc .shift-list{display:none}
.doc .esign-note{color:#5b7f5f;font-weight:600;white-space:normal}
.doc .preamble .pre-to{margin-bottom:5mm;font-size:11pt}
.doc .preamble .pre-h{font-weight:600;margin:4mm 0 1mm;border-left:3px solid #5b7f5f;padding-left:2mm}
.doc .preamble .pre-from{text-align:right;margin-top:8mm}
@media screen and (min-width:761px){
  .doc:not(.fixed){font-size:10.5pt;line-height:1.6}
  .doc:not(.fixed) .doc-page{width:auto;max-width:200mm;padding:10mm 12mm;margin:0 auto 16px;box-shadow:0 1px 4px rgba(0,0,0,.15)}
  .doc:not(.fixed) .tiny,.doc:not(.fixed) ol.svc{font-size:9.8pt;line-height:1.55}
  .doc:not(.fixed) h1{font-size:16pt}
  .doc:not(.fixed) .preamble{font-size:11.5pt}
}
@media screen and (max-width:760px){
  .doc:not(.fixed){font-size:14px;line-height:1.7}
  .doc:not(.fixed) .doc-page{width:auto;padding:16px;margin:0 0 12px;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,.12)}
  .doc:not(.fixed) h1{font-size:18px;letter-spacing:.06em}
  .doc:not(.fixed) .head{flex-direction:column;align-items:stretch}
  .doc:not(.fixed) .head .to{min-width:0}
  .doc:not(.fixed) .head .co{font-size:12px}
  .doc:not(.fixed) table.ct, .doc:not(.fixed) table.ct > tbody, .doc:not(.fixed) table.ct > tbody > tr{display:block;width:100%}
  .doc:not(.fixed) table.ct > tbody > tr > th,.doc:not(.fixed) table.ct > tbody > tr > td{display:block;width:auto;border:0;padding:6px 0}
  .doc:not(.fixed) table.ct > tbody > tr > th{background:#eef3ec;padding:6px 8px;margin-top:10px;font-weight:600;border-radius:4px}
  .doc:not(.fixed) .inner-wrap{display:none}
  .doc:not(.fixed) .sign.esign-note{color:#3f6b45;background:#eef3ec;padding:6px 8px;border-radius:4px}
  .doc:not(.fixed) .shift-list{display:block;margin-bottom:8px;padding:8px 10px;background:#f6f6f2;border-radius:6px}
  .doc:not(.fixed) .sign{white-space:normal;text-align:left;margin-top:8px;color:#444}
  .doc:not(.fixed) .tiny,.doc:not(.fixed) ol.svc{font-size:13px;line-height:1.65}
  .doc:not(.fixed) table.wage{width:100%}
  .doc:not(.fixed) .sigblock{margin-left:0}
  .doc:not(.fixed) .preamble{font-size:15px}
}
@media print{
  .doc-page{page-break-after:always;box-shadow:none;padding:0}
  .doc-page:last-child{page-break-after:auto}
}`;
function injectStyles(){ if(document.getElementById('contract-render-style')) return; const s=document.createElement('style'); s.id='contract-render-style'; s.textContent=STYLE; document.head.appendChild(s); }

// 印刷用：1ページ分が A4 の印刷範囲に収まらないときは、そのページだけ縮小して1枚に収める
// （ブラウザやフォントの違いで数行あふれるのを防ぐ。maxMm は余白を除いた高さの目安）
function fitPages(root, maxMm){
  const max=(maxMm||248)*96/25.4;
  const prev=root.getAttribute('style')||'';
  root.style.cssText='display:block;position:absolute;left:-10000px;top:0;visibility:hidden';
  root.querySelectorAll('.doc-page').forEach(pg=>{
    pg.style.zoom='';
    const h=pg.getBoundingClientRect().height;
    if(h>max) pg.style.zoom=String(Math.floor(max/h*1000)/1000);
  });
  root.setAttribute('style',prev);
}

// 1ページずつ画像にしてA4に収める（html2canvas + jsPDF）
async function toPdf(html){
  const box=document.createElement('div');
  box.style.cssText='position:fixed;left:-10000px;top:0;width:186mm;background:#fff';
  box.innerHTML=html; document.body.appendChild(box);
  try{
    const { jsPDF } = window.jspdf;
    const pdf=new jsPDF({unit:'mm', format:'a4', orientation:'portrait'});
    const pages=[...box.querySelectorAll('.doc-page')];
    for(let i=0;i<pages.length;i++){
      const cv=await window.html2canvas(pages[i],{scale:2, backgroundColor:'#ffffff', windowWidth:1200});
      const maxW=186, maxH=277; let w=maxW, h=cv.height*w/cv.width;
      if(h>maxH){ h=maxH; w=cv.width*h/cv.height; }
      if(i>0) pdf.addPage();
      pdf.addImage(cv.toDataURL('image/jpeg',0.92),'JPEG',12+(maxW-w)/2,10,w,h);
    }
    return pdf;
  } finally { box.remove(); }
}

global.ContractRender = { toPdf, fitPages, ORIGINAL_TEXT, PROPOSED_TEXT, AGREEMENTS, mergeText, buildSnapshot, render, injectStyles, jstDateTime };
})(window);
