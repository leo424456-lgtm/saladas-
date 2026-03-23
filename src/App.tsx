/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Salad, Calendar, ChefHat, Leaf, Droplets, DollarSign, X, ArrowLeft, Lightbulb, ShoppingCart, AlertTriangle, Utensils, CheckSquare, RefreshCw, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AnimatedBackground } from './components/AnimatedBackground';

const content = {
  title: "Salada do Dia a Dia 🥗",
  subtitle: "Simples, rápida e gostosa — sem complicação",
  homeMessage: "Com o básico bem feito, você come melhor todos os dias",
  tips: [
    "Tempere a salada apenas na hora de servir para não murchar.",
    "Seque bem as folhas após lavar; a umidade é a maior inimiga da conservação.",
    "Use potes de vidro para guardar saladas, eles conservam melhor o frescor.",
    "Tenha sempre uma proteína pronta na geladeira para facilitar a montagem.",
    "Alterne as cores da salada para garantir nutrientes variados."
  ],
  menu: [
    { id: 'como-montar', title: 'Como montar sua salada', icon: Salad },
    { id: 'cardapio', title: 'Cardápio da semana', icon: Calendar },
    { id: 'cortes', title: 'Cortes e preparo', icon: ChefHat },
    { id: 'conservacao', title: 'Conservação', icon: Leaf },
    { id: 'molhos', title: 'Molhos simples', icon: Droplets },
    { id: 'custo', title: 'Meus gastos', icon: DollarSign },
    { id: 'salada-dia', title: 'Salada do dia 🥗', icon: Salad },
    { id: 'rotina', title: 'Rotina da semana ⏱️', icon: Calendar },
    { id: 'lista-compras', title: 'Lista de compras 🛒', icon: ShoppingCart },
    { id: 'erros', title: 'Erros comuns ⚠️', icon: AlertTriangle },
    { id: 'dicas', title: 'Dicas rápidas 💡', icon: Lightbulb },
    { id: 'comer-hoje', title: 'O que comer hoje 🍽️', icon: Utensils },
    { id: 'checklist', title: 'Checklist diário 📊', icon: CheckSquare },
    { id: 'substituicoes', title: 'Substituições 🔄', icon: RefreshCw },
    { id: 'geladeira', title: 'Organização da geladeira 🧊', icon: Box },
    { id: 'congelador', title: 'Salada no congelador 🧊', icon: Box },
  ],
  sections: {
    'como-montar': {
      title: 'Como montar sua salada',
      body: 'Não complique! Escolha o seu nível:\n\n1. SIMPLES (Base + Tempero)\nEx: Alface + Azeite/Limão\n\n2. COMPLETA (Base + Legume + Proteína + Gordura Boa)\nEx: Alface + Cenoura + Tomate + Frango + Abacate\n\n3. RÁPIDA (Mix pronto + Proteína pronta)\nEx: Mix de folhas + Atum\n\n💡 Dica de Ouro:\nSempre combine uma folha crocante (alface americana) com um legume macio (tomate) e uma proteína.'
    },
    'cardapio': {
      title: 'Cardápio da semana',
      body: 'Escolha o que melhor se adapta à sua rotina:\n\nOPÇÃO ECONÔMICA (Foco em feira e ovos):\nSeg-Sex: Alface + Cenoura + Tomate + Ovo cozido\n\nOPÇÃO COM PROTEÍNA (Foco em frango/atum):\nSeg-Sex: Alface + Pepino + Frango desfiado ou Atum\n\n💡 Lembrete:\nO segredo é ter a base (folhas) lavada e pronta no pote!'
    },
    'cortes': {
      title: 'Cortes e preparo',
      body: 'Erros que murcham sua salada:\n❌ Cortar tomate muito pequeno (solta água)\n❌ Rasgar alface com faca (oxida rápido)\n\nComo fazer rápido:\n✔ Use ralador para cenoura\n✔ Tenha uma faca bem afiada para tomate\n\n💡 Segredo:\nCortes uniformes deixam a salada mais bonita e gostosa de comer.'
    },
    'conservacao': {
      title: 'Conservação',
      body: 'O segredo para durar 5 dias:\n1. Lave bem as folhas.\n2. SEQUE TOTALMENTE (use centrífuga ou pano limpo).\n3. Guarde em pote hermético com papel toalha no fundo.\n\n❌ Erro fatal:\nGuardar folhas úmidas ou temperadas.\n\n💡 Dica:\nSepare as folhas dos legumes mais úmidos (como tomate) em potes diferentes.'
    },
    'molhos': {
      title: 'Molhos simples',
      body: 'Equilibre o sabor com estas 5 variações:\n1. CLÁSSICO: Azeite + Limão + Sal (Para o dia a dia)\n2. VINAGRETE: Azeite + Vinagre + Sal + Orégano (Clássico)\n3. CREMOSO: Iogurte natural + Limão + Ervas (Para proteínas)\n4. AGRIDOCE: Azeite + Mostarda + Mel (Dá um toque especial)\n5. SABOR FORTE: Azeite + Alho amassado + Sal (Para quem ama alho)\n\n💡 Dica:\nSempre misture o molho apenas na hora de comer!'
    },
    'custo': {
      title: 'Meus gastos',
      body: 'Exemplo de lista semanal econômica:\n- Alface, tomate, cenoura, pepino, cebola, ovos.\n\n💰 Média: R$25 a R$40 por semana.\n\nComparação:\nComer fora (1x): R$25+\nComer em casa (semana toda): R$30\n\n💡 Reflexão:\nComer saudável em casa é um investimento, não um gasto.'
    },
    'salada-dia': {
      title: 'Salada do dia 🥗',
      body: 'Sugestão rápida para hoje:\nBase: Alface americana\nLegumes: Cenoura ralada e Tomate cereja\nProteína: Frango grelhado\nTempero: Azeite, limão e uma pitada de sal.\n\n💥 Evite indecisão: Siga essa sugestão e pronto!'
    },
    'rotina': {
      title: 'Rotina da semana ⏱️',
      body: 'Guia prático:\nDomingo: Lave, seque e guarde as folhas. Cozinhe proteínas (frango/ovos).\nSegunda a Sexta: Apenas monte o pote com a base pronta + proteína.\n\n💡 Ajuda quem é desorganizado: O segredo é o preparo no domingo!'
    },
    'lista-compras': {
      title: 'Lista de compras 🛒',
      body: 'O básico da semana:\n- 1 pé de alface\n- 1 caixa de tomate cereja\n- 2 cenouras\n- 1 pepino\n- 500g de frango ou 6 ovos\n\nQuantidade certa para 1 pessoa.'
    },
    'erros': {
      title: 'Erros comuns ⚠️',
      body: 'Evite frustração:\n❌ Folha molhada: Murcha rápido.\n❌ Temperar antes: Solta água e perde crocância.\n❌ Cortar errado: Oxida e estraga o sabor.\n\n💥 Dica: Seque bem e tempere só na hora!'
    },
    'dicas': {
      title: 'Dicas rápidas 💡',
      body: 'Pequenas, mas fortes:\n- Seque bem a folha.\n- Use limão na hora de servir.\n- Mantenha o pote hermético bem fechado.\n\n💥 Sensação de app vivo!'
    },
    'comer-hoje': {
      title: 'O que comer hoje 🍽️',
      body: 'Ajuda direta:\nOpção leve: Mix de folhas + pepino + atum.\nOpção completa: Mix de folhas + cenoura + tomate + frango + abacate.\n\n💡 Resolve decisão!'
    },
    'checklist': {
      title: 'Checklist diário 📊',
      body: 'Crie o hábito:\n☑ Comi salada hoje?\n☑ Bebi água suficiente?\n\n💥 Simples e eficaz!'
    },
    'substituicoes': {
      title: 'Substituições 🔄',
      body: 'Sem complicação:\n- Sem tomate? Use cenoura ou pepino.\n- Sem frango? Use ovo cozido, atum ou grão-de-bico.\n\n💥 Resolve o problema!'
    },
    'geladeira': {
      title: 'Organização da geladeira 🧊',
      body: 'Como guardar:\nFolhas: Pote hermético com papel toalha.\nLegumes: Gaveta inferior ou potes separados.\n\n💡 Valor prático real!'
    },
    'congelador': {
      title: 'Salada no congelador 🧊',
      body: '“Pode congelar salada? Entenda o jeito certo”\n\n❌ NÃO RECOMENDADO (salada pronta)\nFolhas como: Alface, Rúcula, Repolho cru.\n👉 NÃO devem ser congeladas.\nPOR QUÊ? Ficam murchas, soltam muita água e perdem textura e sabor.\n\n---\n\n✔ O QUE PODE CONGELAR\n• Frango cozido\n• Carne preparada\n• Legumes cozidos (cenoura, por exemplo)\n💡 Dica: Congele separado, não junto com a salada.\n\n---\n\n🧊 MELHOR FORMA DE CONSERVAR\n👉 Use geladeira (não freezer)\n• Lave bem\n• Seque totalmente\n• Guarde em pote fechado\n⏱️ Duração: 3 a 5 dias.\n\n---\n\n⚠️ ERRO COMUM\n“Congelar salada pronta achando que vai durar mais”\n👉 Resultado: fica aguada e sem gosto.\n\n💡 DICA FINAL\n“Salada é melhor fresca — prepare e consuma no dia ou em poucos dias”'
    }
  }
};

export default function App() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [tip, setTip] = useState(content.tips[0]);

  useEffect(() => {
    setTip(content.tips[Math.floor(Math.random() * content.tips.length)]);
  }, [activeSection]);

  const renderHome = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-serif font-medium text-[#1a1a1a] tracking-tight">{content.title}</h1>
        <p className="text-lg text-gray-600 font-serif italic">{content.subtitle}</p>
        <motion.button 
          onClick={() => setActiveSection('menu')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 bg-blue-500 text-white rounded-2xl font-bold text-lg shadow-lg border border-blue-600 hover:bg-blue-600 transition-colors"
        >
          Começar agora 🌿
        </motion.button>
      </div>
      <div className="bg-[#f0f9f4] p-4 rounded-2xl border border-[#dcfce7] flex flex-col items-center gap-2 text-center">
        <Lightbulb className="text-[#6ccf8a]" size={20} />
        <p className="text-sm text-gray-700 font-serif">{tip}</p>
      </div>
      <p className="text-sm text-gray-500 font-serif text-center">{content.homeMessage}</p>
    </motion.div>
  );

  const renderMenu = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-medium text-[#1a1a1a]">Menu Principal</h2>
        <motion.button 
          onClick={() => setActiveSection(null)} 
          whileHover={{ rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X size={24} />
        </motion.button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {content.menu.map((item) => (
          <motion.button 
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center gap-2 text-center border border-gray-100"
          >
            <item.icon className="text-[#6ccf8a]" size={24} />
            <span className="text-xs font-medium text-gray-800">{item.title}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );

  const renderSectionContent = () => {
    if (activeSection === 'menu') return renderMenu();
    
    if (activeSection && content.sections[activeSection as keyof typeof content.sections]) {
      const section = content.sections[activeSection as keyof typeof content.sections];
      return (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <motion.button 
            onClick={() => setActiveSection('menu')} 
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-blue-500 font-medium"
          >
            <ArrowLeft size={20} /> Voltar ao Menu
          </motion.button>
          <h2 className="text-2xl font-serif font-medium text-[#1a1a1a]">{section.title}</h2>
          <p className="text-gray-700 whitespace-pre-line bg-white p-6 rounded-2xl shadow-sm border border-gray-100 leading-relaxed">{section.body}</p>
        </motion.div>
      );
    }

    return renderHome();
  };

  return (
    <div className="min-h-screen bg-[#f5f7f5]">
      <AnimatedBackground />
      {/* Hero Section */}
      <div className="relative h-[40vh] w-full overflow-hidden rounded-b-3xl">
        <img
          src="https://i.ibb.co/gbdY6Ldq/a45484ba179cef1dbc1529b14ac4e4b2-XL.jpg"
          alt="Salada fresca"
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end items-center text-center p-8">
          <h1 className="text-4xl font-serif font-bold text-white tracking-tight">Salada do Dia a Dia 🥗</h1>
          <p className="text-xl text-white/90 font-serif italic">Simples, prática e gostosa</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-xl mx-auto p-6 -mt-8">
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-white/50">
          <AnimatePresence mode="wait">
            {renderSectionContent()}
          </AnimatePresence>
          <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-400 text-xs font-serif space-y-2">
            <p>━━━━━━━━━━━━━━━━━━</p>
            <p>🌿 Esse aplicativo foi feito para facilitar sua rotina</p>
            <p>💖 Volte amanhã e continue</p>
            <p>🥗 2026 • Salada do Dia a Dia</p>
          </div>
        </div>
      </div>
    </div>
  );
}
