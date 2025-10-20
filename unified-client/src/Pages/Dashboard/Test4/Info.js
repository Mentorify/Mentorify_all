import React from 'react'

export default function Info(props) {
  return (
    <>
    <div className='m-3'>
      <div className='card my-3' style={{
        background:"rgba(172, 233, 23, 0.4)"
      }}>
        <div className='card-body'>
        <h3 className='h3 card-title' style={{
          fontWeight:'700'
        }}>1. Openness</h3>
        <div className='card-text mt-3'>
        Openness is when someone is curious and open-minded to new experiences and knowledge.
People who rate high in openness are inventive and curious. People who rate low in openness
are consistent and cautious.
<ul>
<li>You love adventure.</li> 
<li>You are imaginative.</li> 
<li>You are the first to try new activities.</li>   
</ul> 
 
If you agree, you probably rate high in openness. If you disagree, you probably rate low in
openness.
Openness has 57% genetic influence
<br />
<strong>Special Note:</strong> If you rate high in openness, let people in your life know that you love to be
challenged. Make sure you have creative outlets to express yourself. You also have to make
sure your spouse or partner knows your level of adventure so your needs are met.
        </div>
        </div>
      </div>
      <div className='card my-3' style={{
        background:"rgba(25, 192, 134, 0.4)"
      }}>
        <div className='card-body'>
        <h3 className='h3 card-title' style={{
          fontWeight:'700'
        }}>2. Conscientiousness</h3>
        <div className='card-text mt-3'>
        Conscientiousness describes how organised and dependable you are. People who rate high in
conscientiousness are efficient and organized. People who rate low in conscientiousness are
more easy-going and laid back.
Do you agree or disagree with these statements?
<ul>
  <li>You are highly self-disciplined.</li>
  <li>You are very organized and always come prepared.</li>
  <li>You like to know the plan rather than be spontaneous.</li>
</ul> 
If you agree, you probably rate high in conscientiousness. If you disagree, you probably rate low
in conscientiousness.
Conscientiousness has 49% genetic influence
<br />
<strong>Special Note: </strong>
If you rate high in conscientiousness, you want to make sure the people
around you respect your desire to have a plan. But don't get too frustrated with people who rate
low in conscientiousness-you can't blame them for not being organized. It just doesn't come as
naturally.
        </div>
        </div>
      </div>
      <div className='card my-3' style={{
        background:"rgba(123, 158, 186, 0.4)"
      }}>
        <div className='card-body'>
        <h3 className='h3 card-title' style={{
          fontWeight:'700'
        }}>3. Extroversion</h3>
        <div className='card-text mt-3'>
        Extraversion describes how you interact with people. People who rate high in extroversion are
outgoing and energetic. People who rate low in extroversion are more solitary and reserved. Do
you agree or disagree with these statements?
<ul>
  <li>You are the life of the party.</li>
  <li>You don't mind being the centre of attention.</li>
  <li>You are usually the one to start a conversation with someone.</li>
</ul>
If you agree, you probably rate high in extroversion. If you disagree, you probably rate low in
extroversion.
        </div>
        </div>
      </div>
      <div className='card my-3' style={{
        background:"rgba(255, 205, 86, 0.4)"
      }}>
        <div className='card-body'>
        <h3 className='h3 card-title' style={{
          fontWeight:'700'
        }}>4. Agreeableness</h3>
        <div className='card-text mt-3'>
        Agreeableness is how you feel toward others. People who rate high in agreeableness are
friendly and compassionate. People who rate low in agreeableness are more analytical and
detached. Do you agree or disagree with these statements?
<ul>
<li>You tend to trust people and give them the benefit of the doubt.</li> 
<li>You are extremely empathetic.</li> 
<li>You like to make other people feel at ease.</li>
</ul>
 
If you agreed, you rate probably high in agreeableness. If you disagreed, you rate probably low
in agreeableness.
Agreeableness has 42% genetic influence
<br />
<strong>Special Note:</strong> If you rate low in agreeableness, empathy doesn’t come as naturally to you.
So, your partner might say things such as, ‘Don’t you understand me?’ or, ‘Why don’t you get
me?’ That’s okay. Know that you must make more mental effort to put yourself in their shoes.
        </div>
        </div>
      </div>
      <div className='card my-3' style={{
        background:"rgba(224, 62, 95, 0.4)"
      }}>
        <div className='card-body'>
        <h3 className='h3 card-title' style={{
          fontWeight:'700'
        }}>5. Neuroticism</h3>
        <div className='card-text mt-3'>
        Neuroticism is how you deal with emotions. People who rate high in neuroticism are sensitive
and tend to be more nervous. People who rate low in neuroticism tend to be more secure and
stable. Do you agree or disagree with these statements?
<ul>
  <li>I stress out easily.</li>
  <li>I tend to be moody.</li>
  <li>I am a worrier.</li>
</ul>

If you agree, you probably rate high in neuroticism. If you disagree, you probably rate low in
neuroticism.
Neuroticism has 48% genetic influence
<br />
<strong>Special Note:</strong> If you rate high in neuroticism, you have to know your triggers–what makes
you worry? And your calmers–what helps you calm down? So you can be more in control of
your moods.
        </div>
        </div>
      </div>
      
    </div>
    {!props.hidePrintButton && (
      <div className='text-center'>Mentorify Technologies Private Limited</div>
    )}
    </>
  )
}
