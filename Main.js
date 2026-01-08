// Client-side handling: validation with red borders and success modal
document.addEventListener('DOMContentLoaded', () => {
	// Ensure page loads at top after reload
	try { if ('scrollRestoration' in window.history) { window.history.scrollRestoration = 'manual'; } } catch {}
	window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
	const btn = document.getElementById('submitBtn');
	// Theme toggle
	const themeToggleBtn = document.getElementById('themeToggleBtn');
	const langToggleBtn = document.getElementById('langToggleBtn');

	// Simple i18n dictionary
	const i18n = {
		ar: {
			lang: 'ar', dir: 'rtl',
			title: 'قياس نضج الثقافة التنظيمية',
			hero1: 'قياس النضج اتجاه الثقافة التنظيمية ..',
			hero2: 'اكتب الوصف هنا..',
			hero3: 'نقدّر مشاركتكم القيّمة، ونؤكد أن كافة البيانات والملاحظات الواردة سيتم التعامل معها بسرية تامة، وستُستخدم فقط في إطار التحسين المستمر ورفع كفاءة الأداء المؤسسي.',
			hero4: 'شاكرين لكم وقتكم وتعاونكم، ومتطلعين إلى استمرار شراكة ناجحة ومثمرة. مع خالص التقدير — إدارة الشراكات  الهيئة العامة للمساحة والمعلومات الجيومكانية.',
			formNote: 'الوقت المتوقع للتعبئة: دقيقتان',
			basicInfoTitle: 'المعلومات الأساسية',
			sectorLabel: 'اختر الفئة الوظيفية',
			usageLabel: 'المبنى الذي تقضي فيه ساعات عملك',
			jobClassLabel: 'تصنف وظيفتك',
			optSelect: 'الرجاء الاختيار',
			optSector: { support_22_23: 'الدعم والمساندة 22 و 23', specialist_24_28: 'الإخصائية 24 – 28', middle_29_32: 'الإدارة الوسطى 29-32', senior_33_35: 'الإدارة العليا والقيادية 33-35' },
			optUsage: { main: 'الرئيسي', production: 'الإنتاجي', jeddah: 'فرع جدة' },
			optJobClass: { core_tech: 'فنية ضمن نطاق الهيئة الأساسي', survey_support: 'وظائف أعمال المساحة، داعمة وممكنة لأعمال الهيئة', finance: 'وظائف المالية', project_mgmt: 'إدارة المشاريع', hr: 'رأس المال البشري' },
			ratingTitle: 'المصداقية والاحترام ',
			categoryCredibility: 'المصداقية',
			categoryRespect: 'الاحترام',
			categoryJustice: 'العدالة والشعور بالفخر',
			categoryJusticeOnly: 'العدالة',
			categoryPride: 'الشعور بالفخر Pride',
			categoryTeamSpirit: 'الزمالة وروح الفريق',
			progressJusticeLabel: 'العدالة والشعور بالفخر',
			progressTeamLabel: 'الزمالة وروح الفريق',
			ratingNote: 'استخدم مقياسًا من (1 إلى 5): <span class="note-num n1">1</span> لا أوافق على الإطلاق، <span class="note-num n2">2</span> لا أوافق، <span class="note-num n3">3</span> محايد، <span class="note-num n4">4</span> أوافق، <span class="note-num n5">5</span> أوافق بشدة',
			qTexts: {
				cred1: 'الإدارة العليا تشرح أسباب القرارات المهمة بوضوح',
				cred2: 'تصلني المعلومات المتعلقة بالعمل في الوقت المناسب',
				cred3: 'هناك اتساق بين ما يُقال وما يتم تطبيقه فعلياً',
				cred4: 'يتم الاعتراف بالأخطاء ومعالجتها بشفافية',
				cred5: 'تتسم توجيهات القيادة بالوضوح وتقل فيها التناقضات',
				cred6: 'أهداف الجهة واضحة ومترجمة إلى أولويات تنفيذية',
				cred7: 'يتاح للموظفين طرح الأسئلة والحصول على إجابات صريحة',
				cred8: 'أشعر أن وعود الإدارة قابلة للتحقق ويتم الالتزام بها',
				respect1: 'أحصل على الدعم اللازم لإنجاز عملي بجودة عالية',
				respect2: 'يتم تفويض الصلاحيات بما يتناسب مع المسؤوليات',
				respect3: 'تتوفر فرص تعلم وتطوير عادلة وواضحة',
				respect4: 'مديري المباشر يهتم بتطوري المهني ويوجهني بموضوعية',
				respect5: 'يتم التعامل باحترام مع توازن العمل والحياة قدر الإمكان',
				respect6: 'تؤخذ ملاحظات الموظفين  تجاه  تحسين بيئة العمل بجدية',
				respect7: 'تؤخذ ملاحظات الموظفين  تجاه  تحسين بيئة العمل بجدية',
				respect8: 'تتم إدارة  أعباء  العمل بشكل معقول وعادل بين الفريق',
				justice18: 'تتم الترقيات بناءً على معايير واضحة ومعلنة',
				justice19: 'يتم تقييم الأداء بموضوعية واتساق',
				justice20: 'أشعر بتكافؤ الفرص في التدريب والتكليفات النوعية',
				justice21: 'تُدار المكافآت والحوافز إن وجدت بمعايير عادلة',
				justice22: 'تُعالج الشكاوى/التظلمات بسرية وعدالة',
				justice23: 'لا تؤثر العلاقات الشخصية على القرارات الإدارية',
				justice24: 'يتم التعامل مع الجميع بنفس المعايير دون تمييز',
				justice24b: 'القرارات المتعلقة بالموارد عادلة (فرص، مهام، مزايا)',
				pride25: 'أشعر بالفخر لكوني جزءاً من هذه الجهة',
				pride26: 'أرى أن عملي يساهم في تحقيق أثر واضح للمستفيدين/للوطن',
				pride27: 'أعرف كيف يساهم عملي اليومي في أهداف الجهة',
				pride28: 'يتم الاحتفاء بالإنجازات المؤسسية والفردية بشكل مناسب',
				pride29: 'سمعة الجهة تجعلني أوصي الآخرين بالعمل بها',
				pride30: 'أشعر بأن جودة الخدمات/المنتجات التي نقدمها عالية',
				pride31: 'أشعر بالانتماء لقيم الجهة وليس فقط للمهام الوظيفية',
				pride32: 'في الجهة قصص نجاح ملهمة يتم إبرازها داخلياً',
				team33: 'تسود علاقات عمل إيجابية داخل فريقي',
				team34: 'يتم التعاون بين الإدارات بشكل عملي وليس شكلياً',
				team35: 'يتم حل الخلافات بشكل محترم وبنّاء',
				team36: 'أشعر بالأمان لطرح رأيي دون تبعات سلبية',
				team37: 'يُشجَّع العمل بروح الفريق أكثر من العمل الفردي',
				team38: 'يتم تقدير مساهمات الجميع داخل الفريق',
				team39: 'أشعر أن بيئة العمل داعمة ومحفزة',
				team40: 'يوجد شعور عام بالثقة المتبادلة بين الزملاء'
			},
			commentsPrompt: 'ماهي الأفكار أو الاقتراحات التي ترغب في مشاركتها لتحسين تجربتك معنا؟',
			commentsPlaceholder: 'اكتب الملاحظات هنا',
			submit: 'إرسال',
			modalTitle: 'شكراً لك!',
			modalText: 'تم استلام إجاباتك بنجاح.',
			close: 'إغلاق',
			next: 'التالي',
			back: 'رجوع',
			footer: 'جميع الحقوق محفوظة - الهيئة العامة للمساحة والمعلومات الجيومكانية 2025',
			langBtnLabel: 'اللغة'
		},
		en: {
			lang: 'en', dir: 'ltr',
			title: 'Partnerships Management — Survey',
			hero1: 'Measuring maturity toward organizational culture ..',
			hero2: 'Write the description here..',
			hero3: 'We value your participation and confirm that all data and comments will be treated with strict confidentiality and used solely for continuous improvement and enhancing institutional performance.',
			hero4: 'Thank you for your time and cooperation; we look forward to a successful and fruitful partnership. With sincere appreciation, Partnerships Department — General Authority for Survey and Geospatial Information.',
			formNote: 'Expected fill time: 2 minutes',
			basicInfoTitle: 'Basic Information',
			sectorLabel: 'Select job category',
			usageLabel: 'Workplace building',
			jobClassLabel: 'Classify your job',
			optSelect: 'Please select',
			optSector: { support_22_23: 'Support 22–23', specialist_24_28: 'Specialist 24–28', middle_29_32: 'Middle management 29–32', senior_33_35: 'Senior leadership 33–35' },
			optUsage: { main: 'Main (HQ)', production: 'Production', jeddah: 'Jeddah Branch' },
			optJobClass: { core_tech: 'Technical within core scope', survey_support: 'Survey business roles (supporting/enabling)', finance: 'Finance roles', project_mgmt: 'Project management', hr: 'Human capital' },
			ratingTitle: 'Evaluation Questions',
			categoryCredibility: 'Credibility',
			categoryRespect: 'Respect',
			categoryJustice: 'Fairness & Pride',
			categoryJusticeOnly: 'Fairness',
			categoryPride: 'Pride',
			categoryTeamSpirit: 'Team Spirit',
			progressJusticeLabel: 'Fairness & Pride',
			progressTeamLabel: 'Team Spirit',
			ratingNote: 'Use a scale (1 to 5): <span class="note-num n1">1</span> Strongly disagree, <span class="note-num n2">2</span> Disagree, <span class="note-num n3">3</span> Neutral, <span class="note-num n4">4</span> Agree, <span class="note-num n5">5</span> Strongly agree',
			qTexts: {
				cred1: 'الإدارة العليا تشرح أسباب القرارات المهمة بوضوح',
				cred2: 'تصلني المعلومات المتعلقة بالعمل في الوقت المناسب',
				cred3: 'هناك اتساق بين ما يُقال وما يتم تطبيقه فعلياً',
				cred4: 'يتم الاعتراف بالأخطاء ومعالجتها بشفافية',
				cred5: 'تتسم توجيهات القيادة بالوضوح وتقل فيها التناقضات',
				cred6: 'أهداف الجهة واضحة ومترجمة إلى أولويات تنفيذية',
				cred7: 'يتاح للموظفين طرح الأسئلة والحصول على إجابات صريحة',
				cred8: 'أشعر أن وعود الإدارة قابلة للتحقق ويتم الالتزام بها',
				respect1: 'أحصل على الدعم اللازم لإنجاز عملي بجودة عالية',
				respect2: 'يتم تفويض الصلاحيات بما يتناسب مع المسؤوليات',
				respect3: 'تتوفر فرص تعلم وتطوير عادلة وواضحة',
				respect4: 'مديري المباشر يهتم بتطوري المهني ويوجهني بموضوعية',
				respect5: 'يتم التعامل باحترام مع توازن العمل والحياة قدر الإمكان',
				respect6: 'تؤخذ ملاحظات الموظفين  تجاه  تحسين بيئة العمل بجدية',
				respect7: 'تؤخذ ملاحظات الموظفين  تجاه  تحسين بيئة العمل بجدية',
				respect8: 'تتم إدارة  أعباء  العمل بشكل معقول وعادل بين الفريق',
				justice18: 'تتم الترقيات بناءً على معايير واضحة ومعلنة',
				justice19: 'يتم تقييم الأداء بموضوعية واتساق',
				justice20: 'أشعر بتكافؤ الفرص في التدريب والتكليفات النوعية',
				justice21: 'تُدار المكافآت والحوافز إن وجدت بمعايير عادلة',
				justice22: 'تُعالج الشكاوى/التظلمات بسرية وعدالة',
				justice23: 'لا تؤثر العلاقات الشخصية على القرارات الإدارية',
				justice24: 'يتم التعامل مع الجميع بنفس المعايير دون تمييز',
				justice24b: 'القرارات المتعلقة بالموارد عادلة (فرص، مهام، مزايا)',
				pride25: 'أشعر بالفخر لكوني جزءاً من هذه الجهة',
				pride26: 'أرى أن عملي يساهم في تحقيق أثر واضح للمستفيدين/للوطن',
				pride27: 'أعرف كيف يساهم عملي اليومي في أهداف الجهة',
				pride28: 'يتم الاحتفاء بالإنجازات المؤسسية والفردية بشكل مناسب',
				pride29: 'سمعة الجهة تجعلني أوصي الآخرين بالعمل بها',
				pride30: 'أشعر بأن جودة الخدمات/المنتجات التي نقدمها عالية',
				pride31: 'أشعر بالانتماء لقيم الجهة وليس فقط للمهام الوظيفية',
				pride32: 'في الجهة قصص نجاح ملهمة يتم إبرازها داخلياً',
				team33: 'تسود علاقات عمل إيجابية داخل فريقي',
				team34: 'يتم التعاون بين الإدارات بشكل عملي وليس شكلياً',
				team35: 'يتم حل الخلافات بشكل محترم وبنّاء',
				team36: 'أشعر بالأمان لطرح رأيي دون تبعات سلبية',
				team37: 'يُشجَّع العمل بروح الفريق أكثر من العمل الفردي',
				team38: 'يتم تقدير مساهمات الجميع داخل الفريق',
				team39: 'أشعر أن بيئة العمل داعمة ومحفزة',
				team40: 'يوجد شعور عام بالثقة المتبادلة بين الزملاء'
			},
			commentsPrompt: 'Do you have any additional notes to improve the user experience?',
			commentsPlaceholder: 'Write your notes here',
			submit: 'Submit',
			modalTitle: 'Thank you!',
			modalText: 'Your responses have been received successfully.',
			close: 'Close',
			next: 'Next',
			back: 'Back',
			footer: 'All rights reserved — General Authority for Survey and Geospatial Information 2025',
			langBtnLabel: 'Language'
		}
	};

	function refreshSelectUI(selectEl) {
		const wrapper = selectEl.previousElementSibling;
		if (!wrapper || !wrapper.classList.contains('dropdown')) return;
		const menu = wrapper.querySelector('.dropdown-menu');
		const labelSpan = wrapper.querySelector('.dropdown-toggle span:first-child');
		menu.innerHTML = '';
		Array.from(selectEl.options).forEach(opt => {
			if (opt.value === '' || opt.disabled || opt.hidden) return;
			const item = document.createElement('div');
			item.className = 'dropdown-item' + (opt.selected ? ' active' : '');
			item.textContent = opt.textContent;
			item.dataset.value = opt.value;
			item.addEventListener('click', () => {
				selectEl.value = opt.value;
				labelSpan.textContent = opt.textContent;
				menu.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('active'));
				item.classList.add('active');
				selectEl.dispatchEvent(new Event('change', { bubbles: true }));
				wrapper.classList.remove('open');
				const panelForClick = selectEl.closest('.step-panel');
				if (panelForClick) panelForClick.style.overflow = '';
			});
			menu.appendChild(item);
		});
		labelSpan.textContent = selectEl.options[selectEl.selectedIndex]?.text || '';
	}

	function applyLanguageStrings(dict) {
		// Set document language and direction
		document.documentElement.lang = dict.lang;
		document.documentElement.dir = dict.dir;
		updateLogo();
		// Title
		document.title = dict.title;
		// Hero
		const l1 = document.querySelector('.line-1'); if (l1) l1.textContent = dict.hero1;
		const l2 = document.querySelector('.line-2'); if (l2) l2.textContent = dict.hero2;
		const l3 = document.querySelector('.line-3'); if (l3) l3.textContent = dict.hero3;
		const l4 = document.querySelector('.line-4'); if (l4 && dict.hero4) l4.textContent = dict.hero4;
		// Note & section titles
		document.querySelectorAll('.form-note').forEach(n => { n.textContent = dict.formNote; });
		const basicTitle = document.getElementById('basic-info-title'); if (basicTitle) basicTitle.textContent = dict.basicInfoTitle;
		const progBasic = document.getElementById('progress-basic-label'); if (progBasic) progBasic.textContent = dict.basicInfoTitle;
		// Labels for selects
		const sectorLabel = document.querySelector('label[for="sector"]'); if (sectorLabel) sectorLabel.innerHTML = `<span class="req">*</span>${dict.sectorLabel}`;
		const usageLabel = document.querySelector('label[for="usageFreq"]'); if (usageLabel) usageLabel.innerHTML = `<span class="req">*</span>${dict.usageLabel}`;
		const jobClassLbl = document.querySelector('label[for="jobClass"]'); if (jobClassLbl) jobClassLbl.innerHTML = `<span class="req">*</span>${dict.jobClassLabel}`;
		// Select options text
		const sectorSel = document.getElementById('sector');
		const usageSel = document.getElementById('usageFreq');
		const jobClassSel = document.getElementById('jobClass');
		function setOptionText(sel, map, placeholder) {
			if (!sel) return;
			Array.from(sel.options).forEach(opt => {
				if (opt.value === '') { opt.textContent = placeholder; }
				else if (map[opt.value]) { opt.textContent = map[opt.value]; }
			});
		}
		setOptionText(sectorSel, dict.optSector, dict.optSelect);
		setOptionText(usageSel, dict.optUsage, dict.optSelect);
		setOptionText(jobClassSel, dict.optJobClass, dict.optSelect);
		// Update custom dropdown UIs if present
		if (sectorSel) refreshSelectUI(sectorSel);
		if (usageSel) refreshSelectUI(usageSel);
		if (jobClassSel) refreshSelectUI(jobClassSel);
		// Rating section headings
		const ratingTitle = document.querySelector('.rating-title'); if (ratingTitle) ratingTitle.textContent = dict.ratingTitle;
		const progQuestions = document.getElementById('progress-questions-label'); if (progQuestions) progQuestions.textContent = dict.ratingTitle;
		const progJustice = document.getElementById('progress-justice-label'); if (progJustice) progJustice.textContent = dict.progressJusticeLabel;
		const progTeam = document.getElementById('progress-team-label'); if (progTeam) progTeam.textContent = dict.progressTeamLabel;
		const catCred = document.getElementById('cat-cred'); if (catCred) catCred.textContent = dict.categoryCredibility;
		const catRespect = document.getElementById('cat-respect'); if (catRespect) catRespect.textContent = dict.categoryRespect;
		const justiceTitle = document.getElementById('justice-title'); if (justiceTitle) justiceTitle.textContent = dict.categoryJustice;
		const justiceCat = document.getElementById('cat-justice'); if (justiceCat) justiceCat.textContent = dict.categoryJusticeOnly;
		const prideCat = document.getElementById('cat-pride'); if (prideCat) prideCat.textContent = dict.categoryPride;
		const teamTitle = document.getElementById('team-title'); if (teamTitle) teamTitle.textContent = dict.categoryTeamSpirit;
		document.querySelectorAll('.rating-note').forEach(note => { note.innerHTML = dict.ratingNote; });
		// Questions by input name
		function setQuestion(name, text) {
			const anyInput = document.querySelector(`input[name="${name}"]`);
			const container = anyInput ? anyInput.closest('.rating-question') : null;
			const box = container ? container.querySelector('.rating-question-text') : null;
			if (box) box.innerHTML = `<span class="req">*</span>${text}`;
		}
		setQuestion('rating.cred1', dict.qTexts.cred1);
		setQuestion('rating.cred2', dict.qTexts.cred2);
		setQuestion('rating.cred3', dict.qTexts.cred3);
		setQuestion('rating.cred4', dict.qTexts.cred4);
		setQuestion('rating.cred5', dict.qTexts.cred5);
		setQuestion('rating.cred6', dict.qTexts.cred6);
		setQuestion('rating.cred7', dict.qTexts.cred7);
		setQuestion('rating.cred8', dict.qTexts.cred8);
		setQuestion('rating.respect1', dict.qTexts.respect1);
		setQuestion('rating.respect2', dict.qTexts.respect2);
		setQuestion('rating.respect3', dict.qTexts.respect3);
		setQuestion('rating.respect4', dict.qTexts.respect4);
		setQuestion('rating.respect5', dict.qTexts.respect5);
		setQuestion('rating.respect6', dict.qTexts.respect6);
		setQuestion('rating.respect7', dict.qTexts.respect7);
		setQuestion('rating.respect8', dict.qTexts.respect8);
		setQuestion('rating.justice18', dict.qTexts.justice18);
		setQuestion('rating.justice19', dict.qTexts.justice19);
		setQuestion('rating.justice20', dict.qTexts.justice20);
		setQuestion('rating.justice21', dict.qTexts.justice21);
		setQuestion('rating.justice22', dict.qTexts.justice22);
		setQuestion('rating.justice23', dict.qTexts.justice23);
		setQuestion('rating.justice24', dict.qTexts.justice24);
		setQuestion('rating.justice24b', dict.qTexts.justice24b);
		setQuestion('rating.pride25', dict.qTexts.pride25);
		setQuestion('rating.pride26', dict.qTexts.pride26);
		setQuestion('rating.pride27', dict.qTexts.pride27);
		setQuestion('rating.pride28', dict.qTexts.pride28);
		setQuestion('rating.pride29', dict.qTexts.pride29);
		setQuestion('rating.pride30', dict.qTexts.pride30);
		setQuestion('rating.pride31', dict.qTexts.pride31);
		setQuestion('rating.pride32', dict.qTexts.pride32);
		setQuestion('rating.team33', dict.qTexts.team33);
		setQuestion('rating.team34', dict.qTexts.team34);
		setQuestion('rating.team35', dict.qTexts.team35);
		setQuestion('rating.team36', dict.qTexts.team36);
		setQuestion('rating.team37', dict.qTexts.team37);
		setQuestion('rating.team38', dict.qTexts.team38);
		setQuestion('rating.team39', dict.qTexts.team39);
		setQuestion('rating.team40', dict.qTexts.team40);
		// Comments
		const commentsPrompt = document.querySelector('#q-comments .rating-question-text'); if (commentsPrompt) commentsPrompt.textContent = dict.commentsPrompt;
		const commentsInput = document.getElementById('comments'); if (commentsInput) commentsInput.placeholder = dict.commentsPlaceholder;
		// Consent removed
		// Buttons
		const submitBtn = document.getElementById('submitBtn'); if (submitBtn) submitBtn.textContent = dict.submit;
		const nextBtn = document.getElementById('nextBtn'); if (nextBtn) nextBtn.textContent = dict.next;
		const nextToJusticeBtn = document.getElementById('nextToJusticeBtn'); if (nextToJusticeBtn) nextToJusticeBtn.textContent = dict.next;
		const nextToTeamBtn = document.getElementById('nextToTeamBtn'); if (nextToTeamBtn) nextToTeamBtn.textContent = dict.next;
		const backBtn = document.getElementById('backBtn'); if (backBtn) backBtn.textContent = dict.back;
		const backToQuestionsBtn = document.getElementById('backToQuestionsBtn'); if (backToQuestionsBtn) backToQuestionsBtn.textContent = dict.back;
		const backToJusticeBtn = document.getElementById('backToJusticeBtn'); if (backToJusticeBtn) backToJusticeBtn.textContent = dict.back;
		const closeBtn = document.getElementById('modalCloseBtn'); if (closeBtn) closeBtn.textContent = dict.close;
		// Modal
		const mTitle = document.querySelector('.modal-title'); if (mTitle) mTitle.textContent = dict.modalTitle;
		const mText = document.querySelector('.modal-text'); if (mText) mText.textContent = dict.modalText;
		// Footer
		const footer = document.querySelector('footer .container'); if (footer) footer.textContent = dict.footer;
		// Lang button aria
		if (langToggleBtn) langToggleBtn.setAttribute('aria-label', dict.langBtnLabel);
	}

	(function initLanguage() {
		const saved = localStorage.getItem('lang');
		const initial = (saved === 'en' || saved === 'ar') ? saved : 'ar';
		applyLanguageStrings(i18n[initial]);
		if (langToggleBtn) {
			langToggleBtn.addEventListener('click', () => {
				const current = document.documentElement.lang === 'en' ? 'en' : 'ar';
				const next = current === 'ar' ? 'en' : 'ar';
				localStorage.setItem('lang', next);
				applyLanguageStrings(i18n[next]);
			});
		}
	})();

	const icons = {
		moon: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>',
		sun: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="5" stroke-width="2" /><path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke-width="2" stroke-linecap="round" /></svg>'
	};

	function getSystemTheme() {
		try { return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; } catch { return 'light'; }
	}

	function applyTheme(theme) {
		const t = theme === 'dark' ? 'dark' : 'light';
		document.documentElement.setAttribute('data-theme', t);
		if (themeToggleBtn) {
			themeToggleBtn.setAttribute('aria-label', t === 'dark' ? 'تبديل إلى الوضع الفاتح' : 'تبديل إلى الوضع الداكن');
			themeToggleBtn.setAttribute('aria-pressed', t === 'dark' ? 'true' : 'false');
			// Swap icon: sun for dark mode, moon for light mode
			themeToggleBtn.innerHTML = t === 'dark' ? icons.sun : icons.moon;
		}
		updateLogo();
	}

	function updateLogo() {
		const theme = document.documentElement.getAttribute('data-theme') || 'light';
		const lang = document.documentElement.lang || 'ar';
		const logo = document.querySelector('.logo');
		if (!logo) return;
		const lightSrcAr = logo.dataset.logoLight || logo.getAttribute('src');
		const darkSrcAr = logo.dataset.logoDark;
		const lightSrcEn = logo.dataset.logoLightEn;
		const darkSrcEn = logo.dataset.logoDarkEn;

		const lightSrc = (lang === 'en' ? (lightSrcEn || lightSrcAr) : lightSrcAr);
		const darkSrc = (lang === 'en' ? (darkSrcEn || darkSrcAr) : darkSrcAr);

		if (theme === 'dark') {
			if (darkSrc) { logo.src = darkSrc; logo.classList.remove('logo-invert'); }
			else { logo.src = lightSrc; logo.classList.add('logo-invert'); }
		} else { logo.src = lightSrc; logo.classList.remove('logo-invert'); }
	}

	(function initTheme() {
		const saved = localStorage.getItem('theme');
		const initial = (saved === 'dark' || saved === 'light') ? saved : getSystemTheme();
		applyTheme(initial);
		if (themeToggleBtn) {
			themeToggleBtn.addEventListener('click', () => {
				const current = document.documentElement.getAttribute('data-theme') || initial;
				const next = current === 'dark' ? 'light' : 'dark';
				localStorage.setItem('theme', next);
				applyTheme(next);
			});
		}
		if (!saved && window.matchMedia) {
			try {
				const mql = window.matchMedia('(prefers-color-scheme: dark)');
				mql.addEventListener('change', (e) => applyTheme(e.matches ? 'dark' : 'light'));
			} catch {}
		}
	})();

	if (!btn) return;

	const successModal = document.getElementById('successModal');
	const modalCloseBtn = document.getElementById('modalCloseBtn');

	const fields = {
		sector: document.getElementById('sector'),
		usageFreq: document.getElementById('usageFreq'),
		jobClass: document.getElementById('jobClass'),
		comments: document.getElementById('comments')
	};

	const ratingNames = [
		'rating.cred1',
		'rating.cred2',
		'rating.cred3',
		'rating.cred4',
		'rating.cred5',
		'rating.cred6',
		'rating.cred7',
		'rating.cred8',
		'rating.respect1',
		'rating.respect2',
		'rating.respect3',
		'rating.respect4',
		'rating.respect5',
		'rating.respect6',
		'rating.respect7',
		'rating.respect8',
		'rating.justice18',
		'rating.justice19',
		'rating.justice20',
		'rating.justice21',
		'rating.justice22',
		'rating.justice23',
		'rating.justice24',
		'rating.justice24b',
		'rating.pride25',
		'rating.pride26',
		'rating.pride27',
		'rating.pride28',
		'rating.pride29',
		'rating.pride30',
		'rating.pride31',
		'rating.pride32',
		'rating.team33',
		'rating.team34',
		'rating.team35',
		'rating.team36',
		'rating.team37',
		'rating.team38',
		'rating.team39',
		'rating.team40'
	];
	const openQuestionIds = ['justiceOpen1', 'justiceOpen2', 'justiceOpen3'];

		// Enhance native selects with custom dropdowns (for styled open list)
		function enhanceSelect(selectEl) {
			if (!selectEl) return;
			if (selectEl.dataset.enhanced === '1') return;

			const container = selectEl.closest('.select') || selectEl.parentElement;
			const wrapper = document.createElement('div');
			wrapper.className = 'dropdown';
			const btn = document.createElement('button');
			btn.type = 'button';
			btn.className = 'dropdown-toggle';
			const labelSpan = document.createElement('span');
			labelSpan.textContent = selectEl.options[selectEl.selectedIndex]?.text || '';
			const caret = document.createElement('span');
			caret.className = 'dropdown-caret';
			btn.appendChild(labelSpan);
			btn.appendChild(caret);
			const menu = document.createElement('div');
			menu.className = 'dropdown-menu';

			Array.from(selectEl.options).forEach(opt => {
				// Skip placeholder option from custom menu
				if (opt.value === "" || opt.disabled || opt.hidden) return;
				const item = document.createElement('div');
				item.className = 'dropdown-item' + (opt.selected ? ' active' : '');
				item.textContent = opt.textContent;
				item.dataset.value = opt.value;
				item.addEventListener('click', () => {
					selectEl.value = opt.value;
					labelSpan.textContent = opt.textContent;
					menu.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('active'));
					item.classList.add('active');
					selectEl.dispatchEvent(new Event('change', { bubbles: true }));
					wrapper.classList.remove('open');
				});
				menu.appendChild(item);
			});

			btn.addEventListener('click', (ev) => {
				ev.stopPropagation();
				const isOpen = wrapper.classList.toggle('open');
				const panel = selectEl.closest('.step-panel');
				if (isOpen) {
					if (panel) panel.style.overflow = 'visible';
					const onDocClick = (e) => {
						if (!wrapper.contains(e.target)) {
							wrapper.classList.remove('open');
							if (panel) panel.style.overflow = '';
							document.removeEventListener('click', onDocClick);
						}
					};
					setTimeout(() => document.addEventListener('click', onDocClick), 0);
				}
				else {
					if (panel) panel.style.overflow = '';
				}
			});

			// Insert dropdown before select, hide native visually
			container.insertBefore(wrapper, selectEl);
			wrapper.appendChild(btn);
			wrapper.appendChild(menu);
			selectEl.classList.add('visually-hidden');
			selectEl.dataset.enhanced = '1';
			// Mark container so CSS can hide the native chevron
			if (container && container.classList) container.classList.add('has-dropdown');
		}

		enhanceSelect(fields.sector);
		enhanceSelect(fields.usageFreq);
		enhanceSelect(fields.jobClass);

	function clearInvalid() {
		document.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
	}

	function validateBasic() {
		clearInvalid();
		let firstInvalid = null;
		['sector', 'usageFreq', 'jobClass'].forEach(k => {
			const el = fields[k];
			if (el && !el.value) {
				el.classList.add('invalid');
				const container = el.closest('.select');
				if (container) container.classList.add('invalid');
				if (!firstInvalid) firstInvalid = container || el;
			}
		});
		if (firstInvalid) {
			firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
			return false;
		}
		return true;
	}

	function validate() {
		clearInvalid();
		let firstInvalid = null;
		// Required selects
		['sector', 'usageFreq', 'jobClass'].forEach(k => {
			const el = fields[k];
			if (el && !el.value) {
				el.classList.add('invalid');
				const container = el.closest('.select');
				if (container) container.classList.add('invalid');
				if (!firstInvalid) firstInvalid = container || el;
			}
		});
		// Required ratings
		ratingNames.forEach(name => {
			const checked = document.querySelector(`input[name="${name}"]:checked`);
			if (!checked) {
				const container = document.querySelector(`input[name="${name}"]`)?.closest('.rating-question');
				if (container) {
					container.classList.add('invalid');
					if (!firstInvalid) firstInvalid = container;
				}
			}
		});
		// Required open-ended questions
		openQuestionIds.forEach(id => {
			const field = document.getElementById(id);
			if (field && !field.value.trim()) {
				field.classList.add('invalid');
				if (!firstInvalid) firstInvalid = field.closest('.rating-question') || field;
			}
		});
		// Consent validation removed
		if (firstInvalid) {
			firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
			return false;
		}
		return true;
	}

	function showModal() {
		if (!successModal) return;
		successModal.classList.add('show');
		successModal.setAttribute('aria-hidden', 'false');
	}
	function hideModalAndReset() {
		if (!successModal) return;
		// Animate closing then refresh
		successModal.classList.add('closing');
		// Keep show so display:flex remains during animation
		setTimeout(() => {
			successModal.classList.remove('closing');
			successModal.classList.remove('show');
			successModal.setAttribute('aria-hidden', 'true');
			// Scroll to top before reloading so next load starts at the beginning
			window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
			// Reload to reset the page to fresh state
			window.location.reload();
		}, 240);
	}

	// Live cleanup of invalid states for selects
	['sector', 'usageFreq', 'jobClass'].forEach(k => {
		const el = fields[k];
		if (el) el.addEventListener('change', () => {
			el.classList.remove('invalid');
			const container = el.closest('.select');
			if (container) container.classList.remove('invalid');
		});
	});
	// Consent listener removed
	ratingNames.forEach(name => {
		document.querySelectorAll(`input[name="${name}"]`).forEach(r => {
			r.addEventListener('change', () => {
				const container = r.closest('.rating-question');
				if (container) container.classList.remove('invalid');
			});
		});
	});
	openQuestionIds.forEach(id => {
		const field = document.getElementById(id);
		if (field) {
			field.addEventListener('input', () => {
				field.classList.remove('invalid');
			});
		}
	});

	// Submit handler
	btn.addEventListener('click', (e) => {
		e.preventDefault();
		if (!validate()) return;
		showModal();
	});

	// Next button handler: validate basic info then reveal questions
	const nextBtnEl = document.getElementById('nextBtn');
	const questionsSection = document.getElementById('questionsSection');
	const nextToJusticeBtnEl = document.getElementById('nextToJusticeBtn');
	const backToQuestionsBtnEl = document.getElementById('backToQuestionsBtn');
	const nextToTeamBtnEl = document.getElementById('nextToTeamBtn');
	const backToJusticeBtnEl = document.getElementById('backToJusticeBtn');
	const basicNextActions = document.getElementById('basic-next-actions');
	const basicSection = document.getElementById('basicSection');
	const backBtnEl = document.getElementById('backBtn');

	// Generic step navigation to support adding future sections
	const stepKeys = Array.from(document.querySelectorAll('.progress .step'))
		.map(s => s.dataset.step)
		.filter(Boolean);
	const panelsByKey = {
		basic: document.getElementById('basicSection'),
		questions: document.getElementById('questionsSection'),
	};
	function getPanelFor(stepKey) {
		return document.querySelector(`.step-panel[data-step="${stepKey}"]`) || panelsByKey[stepKey] || null;
	}
	function setProgressTo(currentKey) {
		const steps = Array.from(document.querySelectorAll('.progress .step'));
		const currentIdx = stepKeys.indexOf(currentKey);
		steps.forEach((stepEl, idx) => {
			stepEl.classList.remove('active', 'completed');
			if (idx === currentIdx) stepEl.classList.add('active');
			else if (idx < currentIdx) stepEl.classList.add('completed');
		});
	}
	let currentStepKey = 'basic';
	setProgressTo(currentStepKey);
	function navigateTo(targetKey) {
		if (!stepKeys.includes(targetKey) || targetKey === currentStepKey) return;
		const fromIdx = stepKeys.indexOf(currentStepKey);
		const toIdx = stepKeys.indexOf(targetKey);
		const forward = toIdx > fromIdx;
		const fromPanel = getPanelFor(currentStepKey);
		const toPanel = getPanelFor(targetKey);
		if (!fromPanel || !toPanel) return;
		if (forward) {
			toPanel.classList.add('enter-from-right');
			fromPanel.classList.add('leave-to-left');
		} else {
			toPanel.classList.add('enter-from-left');
			fromPanel.classList.add('leave-to-right');
		}
		void (toPanel && toPanel.offsetWidth);
		toPanel.classList.add('active');
		fromPanel.classList.remove('active');
		setTimeout(() => {
			toPanel.classList.remove('enter-from-right', 'enter-from-left');
			fromPanel.classList.remove('leave-to-left', 'leave-to-right');
		}, 380);
		currentStepKey = targetKey;
		setProgressTo(currentStepKey);
		// Scroll to an appropriate title in the target panel
		if (targetKey === 'questions') {
			const ratingTitle = document.querySelector('.rating-title');
			if (ratingTitle) ratingTitle.scrollIntoView({ behavior: 'smooth', block: 'start' });
		} else if (targetKey === 'basic') {
			const basicTitle = document.getElementById('basic-info-title');
			if (basicTitle) basicTitle.scrollIntoView({ behavior: 'smooth', block: 'start' });
		} else {
			const targetTitle = getPanelFor(targetKey)?.querySelector('h2, h3');
			if (targetTitle) targetTitle.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}
	if (nextBtnEl) {
		nextBtnEl.addEventListener('click', (e) => {
			e.preventDefault();
			if (!validateBasic()) return;
			navigateTo('questions');
		});
	}

	// Next from questions to justice/pride
	if (nextToJusticeBtnEl) {
		nextToJusticeBtnEl.addEventListener('click', (e) => {
			e.preventDefault();
			navigateTo('justice-pride');
		});
	}

	// Back button handler: return to basic info section
	if (backBtnEl) {
		backBtnEl.addEventListener('click', (e) => {
			e.preventDefault();
			navigateTo('basic');
		});
	}
	// Back from justice/pride to questions
	if (backToQuestionsBtnEl) {
		backToQuestionsBtnEl.addEventListener('click', (e) => {
			e.preventDefault();
			navigateTo('questions');
		});
	}
	// Next from justice/pride to team spirit
	if (nextToTeamBtnEl) {
		nextToTeamBtnEl.addEventListener('click', (e) => {
			e.preventDefault();
			navigateTo('team-spirit');
		});
	}
	// Back from team spirit to justice/pride
	if (backToJusticeBtnEl) {
		backToJusticeBtnEl.addEventListener('click', (e) => {
			e.preventDefault();
			navigateTo('justice-pride');
		});
	}

	// Modal close interactions
	if (modalCloseBtn) modalCloseBtn.addEventListener('click', hideModalAndReset);
	if (successModal) successModal.addEventListener('click', (ev) => {
		if (ev.target === successModal) hideModalAndReset();
	});
});

