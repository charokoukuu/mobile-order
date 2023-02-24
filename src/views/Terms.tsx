import { Spacer } from "../component/SwipeTabs";

export const Terms = (props: {
  onClick?: () => void;
  appBarHeight?: number;
  isDialog?: boolean;
}) => {
  return (
    <div className="japanese_L m-4">
      {!props.isDialog ? (
        <Spacer appBarHeight={props.appBarHeight || 56} mode={"history"} />
      ) : null}
      <div className="mx-auto max-w-3xl rounded-lg bg-white p-[2%] [&_h2]:my-[0.83em] [&_h2]:text-[1.5em] [&_h2]:font-bold [&_li]:list-decimal [&_ul]:ml-4 [&_ul_ul>li]:list-[lower-latin]">
        <h1 className="japanese_L my-5 text-center text-[2em] font-bold text-runticketGrayText">
          利用規約
        </h1>
        <div className="m-auto my-5 w-[90%]">
          <p>
            この本規約は、当方がこのウェブサイト上で提供する本サービスの利用条件を定めるものです。登録ユーザーの皆さまには，本規約に従って，本サービスをご利用いただきます。
          </p>
          <h2>第1条（適用）</h2>
          <ul>
            <li>
              本規約は，ユーザーと当方との間の本サービスの利用に関わる一切の関係に適用されるものとします。
            </li>
            <li>
              当方は本サービスに関し，本規約のほか，ご利用にあたってのルール等，個別規定をすることがあります。これら個別規定はその名称のいかんに関わらず，本規約の一部を構成するものとします。
            </li>
            <li>
              本規約の規定が前条の個別規定の規定と矛盾する場合には，個別規定において特段の定めなき限り，個別規定の規定が優先されるものとします。
            </li>
          </ul>
          <h2>第2条（利用登録）</h2>
          <ul>
            <li>
              本サービスにおいては，登録希望者が本規約に同意の上，当方の定める方法によって利用登録を申請し，当方がこれを承認することによって，利用登録が完了するものとします。
            </li>
            <li>
              当方は，利用登録の申請者について，本規約に違反したことがないか，利用登録を相当でないと判断することがあるものとします。
            </li>
            <ul>
              <li>利用登録の申請に際して虚偽の事項を届け出た場合</li>
              <li>本規約に違反したことがある者からの申請である場合</li>
              <li>その他，当方が利用登録を相当でないと判断した場合</li>
            </ul>
          </ul>
          <h2>第3条（ユーザーIDおよびパスワードの管理）</h2>
          <ul>
            <li>
              ユーザーは，自己の責任において，本サービスのユーザーIDおよびパスワードを適切に管理するものとします。
            </li>
            <li>
              ユーザーは，ユーザーIDおよびパスワードを第三者に利用させ，または貸与・売買等をしてはならず，本サービスの利用を介して得た情報を本サービスの利用以外の目的で利用・転売・譲渡等してはなりません。
            </li>
            <li>
              ユーザーは，本サービスのユーザーIDおよびパスワードを用いて行われた一切の行為について，その責任を負うものとします。
            </li>
          </ul>
          <h2>第4条（料金および決済方法）</h2>
          <p>
            ユーザーは，本サービスの有料部分の対価として，当方が別途定め，本ウェブサイトに表示する料金を，当方が指定する方法により支払うものとします。
          </p>
          <h2>第5条（禁止事項）</h2>
          <p>
            ユーザーは，本サービスの利用にあたり，以下の行為をしてはなりません。
          </p>
          <ul>
            <li>法令または公序良俗に違反する行為</li>
            <li>犯罪行為に関連する行為</li>
            <li>
              本サービスの内容等，本サービスに含まれる著作権，商標権ほか知的財産権を侵害する行為
            </li>
            <li>
              当方，本サービスの他のユーザーまたは第三者の名誉・プライバシー・著作権その他の知的財産権を侵害する行為
            </li>
            <li>本サービスによって得られた情報を商業的に利用する行為</li>
            <li>当方のサービスの運営を妨害するおそれのある行為</li>
            <li>不正アクセスをし，またはこれを試みる行為</li>
            <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
            <li>不正な目的を持って本サービスを利用する行為</li>
            <li>
              本サービスの他のユーザーまたはその他の第三者に不利益，損害，不快感を与える行為
            </li>
            <li>他のユーザーに成りすます行為</li>
            <li>
              当方が許諾しない本サービス上での宣伝，広告，勧誘，または営業行為
            </li>
            <li>
              当方のサービスに関連して，反社会的勢力に対して直接または間接に利益を供与する行為
            </li>
            <li>その他，当方が不適切と判断する行為</li>
          </ul>
          <h2>第6条（本サービスの提供の停止等）</h2>
          <ul>
            <li>
              当方は，以下のいずれかの事由があると判断した場合，ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
            </li>
            <ul>
              <li>
                本サービスにかかるコンピュータシステムの保守点検または更新を行う場合
              </li>
              <li>
                地震，落雷，火災，停電または天災などの不可抗力により，本サービスの提供が困難となった場合
              </li>
              <li>コンピュータまたは通信回線等が事故により停止した場合</li>
              <li>その他，当方が本サービスの提供が困難と判断した場合</li>
            </ul>
            <li>
              当方は，本サービスの提供の停止または中断により，ユーザーまたは第三者が被ったいかなる不利益または損害についても，一切の責任を負わないものとします。
            </li>
          </ul>
          <h2>第7条（利用制限および登録抹消）</h2>
          <ul>
            <li>
              当方は，ユーザーが以下のいずれかに該当する場合には，事前の通知なく，ユーザーに対して，本サービスの全部もしくは一部の利用を制限し，またはユーザーとしての登録を抹消することができるものとします。
            </li>
            <ul>
              <li>本規約のいずれかの条項に違反した場合</li>
              <li>登録事項に虚偽の事実があることが判明した場合</li>
              <li>料金等の支払債務の不履行があった場合</li>
              <li>当方からの連絡に対し，一定期間返答がない場合</li>
              <li>本サービスについて，最終の利用から一定期間利用がない場合</li>
              <li>本サービスについて，最終の利用から一定期間利用がない場合</li>
            </ul>
            <li>
              当方は，本条に基づき当方が行った行為によりユーザーに生じた損害について，一切の責任を負いません。
            </li>
          </ul>
          <h2>第8条（退会）</h2>
          <p>
            ユーザーは，当方の定める退会手続により，本サービスから退会できるものとします。
          </p>
          <h2>第9条（保証の否認および免責事項）</h2>
          <ul>
            <li>
              当方は，本サービスに事実上または法律上の瑕疵（安全性，信頼性，正確性，完全性，有効性，特定の目的への適合性，セキュリティなどに関する欠陥，エラーやバグ，権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
            </li>
            <li>
              当方は，本サービスに起因してユーザーに生じたあらゆる損害について、当方の故意又は重過失による場合を除き、一切の責任を負いません。ただし，本サービスに関する当方とユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合，この免責規定は適用されません。
            </li>
            <li>
              前項ただし書に定める場合であっても，当方は，当方の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害のうち特別な事情から生じた損害（当方またはユーザーが損害発生につき予見し，または予見し得た場合を含みます。）について一切の責任を負いません。また，当方の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害の賠償は，ユーザーから当該損害が発生した月に受領した利用料の額を上限とします。
            </li>
            <li>
              当方は，本サービスに関して，ユーザーと他のユーザーまたは第三者との間において生じた取引，連絡または紛争等について一切責任を負いません。
            </li>
          </ul>
          <h2>第10条（サービス内容の変更等）</h2>
          <p>
            当方は，ユーザーへの事前の告知をもって、本サービスの内容を変更、追加または廃止することがあり、ユーザーはこれを承諾するものとします。
          </p>
          <h2>第11条（利用規約の変更）</h2>
          <ul>
            <li>
              当方は以下の場合には、ユーザーの個別の同意を要せず、本規約を変更することができるものとします。
            </li>
            <li>本規約の変更がユーザーの一般の利益に適合するとき。</li>
            <li>
              本規約の変更が本サービス利用契約の目的に反せず、かつ、変更の必要性、変更後の内容の相当性その他の変更に係る事情に照らして合理的なものであるとき。
            </li>
            <li>
              当方はユーザーに対し、前項による本規約の変更にあたり、事前に、本規約を変更する旨及び変更後の本規約の内容並びにその効力発生時期を通知します。
            </li>
          </ul>
          <h2>第12条（個人情報の取扱い）</h2>
          <p>
            当方は，本サービスの利用によって取得する個人情報については，当方
            <span
              className="japanese_L text-runticketBlue underline hover:text-runticketRed"
              onClick={() => {
                props.onClick
                  ? props.onClick()
                  : (window.location.href = "/privacy");
              }}
            >
              プライバシーポリシー
            </span>
            に従い適切に取り扱うものとします。
          </p>
          <h2>第13条（通知または連絡）</h2>
          <p>
            ユーザーと当方との間の通知または連絡は，当方の定める方法によって行うものとします。当方は,ユーザーから,当方が別途定める方式に従った変更届け出がない限り,現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い,これらは,発信時にユーザーへ到達したものとみなします。
          </p>
          <h2>第14条（権利義務の譲渡の禁止）</h2>
          <p>
            ユーザーは，当方の書面による事前の承諾なく，利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し，または担保に供することはできません。
          </p>
        </div>
      </div>
    </div>
  );
};
